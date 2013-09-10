(function() {

  var authd = false;
  var repoUser = 'itsjoesullivan';
  var repoName = 'bottle';
  var branch = 'master';

var credentials = {
  client_id: "6ffd5228756b80d86c82",
  redirect_uri: 'https://' + chrome.runtime.id + '.chromiumapp.org/',
  client_secret: "0a030a6e9a8eb42eb66cc099a100b953e1069577"
};

function getCode() {
  this.stdout.write('\n\tGetting access code... ');
  var res = Q.defer();
  var options = {
    interactive: true,
    url: 'https://github.com/login/oauth/authorize?client_id=' + credentials.client_id +
      '&reponse_type=token' +
      '&access_type=online' +
      '&redirect_uri=' + encodeURIComponent(credentials.redirect_uri)
  };
  chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
    this.stdout.write('<i style="color: green" class="icon-thumbs-up"></i>');
    var code = /code=(.*)/.exec(redirectUri)[1];
    credentials.code = code;
    res.resolve(code);
  }.bind(this) );
  return res.promise;
};

function retrieveToken() {
  this.stdout.write('\n\tRetrieving access token... ');
  var res = Q.defer();
  $.ajax({
    method: "GET",
    url: 'https://github.com/login/oauth/access_token',
    data: credentials,
    contentType: 'application/x-www-form-urlencoded',
    headers: {
      'Accept': 'application/json'
    }
  }).done(function(obj) {
    this.stdout.write('<i style="color:green" class="icon-thumbs-up"></i>');
    _.extend(credentials, obj);
    Q.resolve();
  }.bind(this) )
}

function init() {
  var res = Q.defer();
  getCode.apply(this).then(retrieveToken.bind(this)).then(function() {
    credentials.github = new Github({
      auth: 'oauth',
      token: credentials.access_token
    });
    github = credentials.github;
    res.resolve();
  }.bind(this));
  return res.promise;
}

function auth() {
  var res =Q.defer();
  if(authd) {
    res.resolve();
  } else {
    this.stdout.log('Authorizing...');
    init.apply(this).then(function() {
      authd = true;
      res.resolve();
    });
  }
  return res.promise;
}

define([],[
  {
    expr: /^github mount/,
    fn: (function() {
      return function(arg) {
        arg.unshift('node');
        var program = new Commander();
        program
          .usage('<repo>')
          .parse(arg);
        var repoName;
        if(program.args.length > 1 ) {
          repoName  = program.args[1];
        }
        if(!repoName) {
          this.stdout.log('usage: github mount &lt;repo&gt;');
          return this.exit();
        }
        auth.apply(this).then(function() {
          if(repoName.indexOf('/') > -1) {
            repoUser = repoName.split('/')[0];
            repoName = repoName.split('/')[1];
          }
          this.fs(github.getRepo(repoUser, repoName));
          console.log(this.fs, this.fs() );
          this.fs().show(function(err, repo) {
            if(err) {
              return this.exit(err);
            }
            this.stdout.log(repo.name + ' mounted from ' + repo.git_url);
            this.exit();
          }.bind(this));
          this._cwd = '/';
        }.bind(this));
      }
    })()
  },
  {
    expr: /^github cat /,
    fn: (function() {
      return function(arg) {
        arg.unshift('node');
        var program = new Commander();
        program
          .parse(arg);
        var fileName;
        if(program.args.length > 1 ) {
          fileName  = program.args[1];
        }
        if(!branch) {
          this.stdout.log('usage: git cat &lt;file&gt;');
          return this.exit();
        }
        auth.apply(this).then(function() {
          var res = Q.defer();
          if(this.fs() && this.fs() instanceof Github.Repository) {
            repo = this.fs();
          } else {
            repo = github.getRepo(repoUser, repoName);
          }
          var filePath = path.resolve(this.cwd(), fileName);
          console.log(filePath);
          repo.read('master', filePath.replace(/^\//,''), function(err, data) {
            if(err) {
              throw new Error("repo.read failed to read " + filePath);
            } else {
              this.stdout.write(data);
              this.exit();
              res.resolve();
            }
          }.bind(this) );
        }.bind(this))
        .fail(function(err) {
          this.exit(err);
        });
      }
    })()
  },
  {
    expr: /^github ls-tree/,
    fn: (function() {
      return function(arg) {
        arg.unshift('node');
        var program = new Commander();
        program
          .usage('<branch>')
          .option('--name-only', 'list only filenames')
          .option('--abbrev <n>', 'use <n> digits to display SHA-1s', parseInt)
          .parse(arg);
        var branch;
        if(program.args.length > 1 ) {
          branch  = program.args[1];
        }
        if(!branch) {
          this.stdout.log('usage: git ls-tree &lt;tree-ish&gt; [&lt;path&gt;...]')
          return this.exit();
        }
        auth.apply(this).then(function() {
          if(this.fs() && this.fs() instanceof Github.Repository) {
            repo = this.fs();
          } else {
            repo = github.getRepo(repoUser, repoName);
          }
          repo.contents(branch, this.cwd(), function(err, contents) {
            _(contents).each(function(file) {
              if(program.nameOnly) {
                this.stdout.log(path.basename(file.path));
              } else {
                var sha = file.sha;
                if(program.abbrev) {
                  sha = file.sha.substring(0, program.abbrev);
                }
                this.stdout.log(file.mode + 
                  ' ' + file.type + 
                  ' ' + sha + 
                  '\t' + path(file.path).basename );
              }
              this.exit();
            }, this);
          }.bind(this));
        }.bind(this));
      }
    })()
  },
  {
    expr: /^github add/,
    fn: function(arg) {
      arg.unshift('node');
      var program = new Commander();
      program
        .usage('<file ...>')
        .parse(arg);
      var files = program.args.slice(1);
      auth.apply(this).then(function() {
        console.log('here');
        var repo = github.getRepo(repoUser, repoName);
        repo.contents('/', function(err, contents) {
          console.log(contents);
          this.stdout.write(contents);


        }.bind(this) );
      }.bind(this) );
    }
  }
]);

})();
