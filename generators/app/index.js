'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var jhipster = require('generator-jhipster');
var exec = require('child_process').exec;
var packagejs = require(__dirname + '/../../package.json');
var yosay = require('yosay');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'ci'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

  initializing: {
    templates: function (args) {
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc
        }
      });
    },
    displayLogo: function () {
      console.log(chalk.green.bold(
        '        _ _   _ _           _                           \n' +
        '       | | | | (_)_ __  ___| |_ ___ _ __                \n' +
        '    _  | | |_| | | \'_ \\/ __| __/ _ \\ \'__|               \n' +
        '   | |_| |  _  | | |_) \\__ \\ ||  __/ |                  \n' +
        '    \\___/|_| |_|_| .__/|___/\\__\\___|_|                  \n' +
        '     ____        |_| _   _                              \n' +
        '    / ___|___  _ __ | |_(_)_ __  _   _  ___  _   _ ___  \n' +
        '   | |   / _ \\| \'_ \\| __| | \'_ \\| | | |/ _ \\| | | / __| \n' +
        '   | |__| (_) | | | | |_| | | | | |_| | (_) | |_| \\__ \\ \n' +
        '    \\____\\___/|_| |_|\\__|_|_| |_|\\__,_|\\___/ \\__,_|___/ \n' +
        '    ___       _                       _   _             \n' +
        '   |_ _|_ __ | |_ ___  __ _ _ __ __ _| |_(_) ___  _ __  \n' +
        '    | || \'_ \\| __/ _ \\/ _` | \'__/ _` | __| |/ _ \\| \'_ \\ \n' +
        '    | || | | | ||  __/ (_| | | | (_| | |_| | (_) | | | |\n' +
        '   |___|_| |_|\\__\\___|\\__, |_|  \\__,_|\\__|_|\\___/|_| |_|\n' +
        '                      |___/                             \n'));
      console.log(chalk.white.bold('              http://jhipster.github.io\n'));
      console.log(chalk.white('Welcome to the ' + chalk.bold('JHipster Continuous Integration') + ' Generator! ' + chalk.yellow('v' + packagejs.version + '\n')));
    }
  },

  prompting: function () {
    var done = this.async();
    var prompts = [
      {
        type: 'list',
        name: 'ciType',
        message: 'Please choose your continuous integration:',
        choices: [
          {name: 'None', value: 'none'},
          {name: 'Travis-CI', value: 'travis'},
          {name: 'CircleCI', value: 'circleci'}
          // {name: 'drone.io', value: 'droneio'}
        ],
        default: 'none'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.ciType = props.ciType;
      done();
    }.bind(this));
  },

  writing: function () {
    var done = this.async();

    this.baseName = jhipsterVar.baseName;
    this.packageName = jhipsterVar.packageName;
    this.devDatabaseType = jhipsterVar.devDatabaseType;
    this.prodDatabaseType = jhipsterVar.prodDatabaseType;
    this.searchEngine = jhipsterVar.searchEngine;
    this.buildTool = jhipsterVar.buildTool;
    this.frontendBuilder = jhipsterVar.frontendBuilder;

    // Create continuous integration files
    if (this.ciType == "travis") {
      this.template('.travis.yml', '.travis.yml', this, {});
    }

    if (this.ciType == "circleci") {
      this.template('circle.yml', 'circle.yml', this, {});
    }
    done();
  },

  end: function () {
    switch (this.ciType) {
      case 'travis': {
        console.log('\n' + chalk.bold.green('##### USAGE #####'));
        break;
      }
      case 'circleci': {
        console.log('\n' + chalk.bold.green('##### USAGE #####'));
        break;
      }
    }
  }
});
