'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var exec = require('child_process').exec;
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'ci'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

    initializing: {
        templates: function (args) {
            this.composeWith('jhipster:modules',
                {
                    options: {
                        jhipsterVar: jhipsterVar,
                        jhipsterFunc: jhipsterFunc
                    }
                },
                this.options.testmode ? {local: require.resolve('generator-jhipster/generators/modules')} : null
            )
        },

        displayLogo: function () {
            if (this.options.testmode) { return; }
            console.log(' \n' +
                chalk.green.bold('        _ _   _ _           _                           \n') +
                chalk.green.bold('       | | | | (_)_ __  ___| |_ ___ _ __                \n') +
                chalk.green.bold('    _  | | |_| | | \'_ \\/ __| __/ _ \\ \'__|               \n') +
                chalk.green.bold('   | |_| |  _  | | |_) \\__ \\ ||  __/ |                  \n') +
                chalk.green.bold('    \\___/|_| |_|_| .__/|___/\\__\\___|_|                  \n') +
                chalk.green.bold('     ____        |_| _   _                              \n') +
                chalk.green.bold('    / ___|___  _ __ | |_(_)_ __  _   _  ___  _   _ ___  \n') +
                chalk.green.bold('   | |   / _ \\| \'_ \\| __| | \'_ \\| | | |/ _ \\| | | / __| \n') +
                chalk.green.bold('   | |__| (_) | | | | |_| | | | | |_| | (_) | |_| \\__ \\ \n') +
                chalk.green.bold('    \\____\\___/|_| |_|\\__|_|_| |_|\\__,_|\\___/ \\__,_|___/ \n') +
                chalk.green.bold('    ___       _                       _   _             \n') +
                chalk.green.bold('   |_ _|_ __ | |_ ___  __ _ _ __ __ _| |_(_) ___  _ __  \n') +
                chalk.green.bold('    | || \'_ \\| __/ _ \\/ _` | \'__/ _` | __| |/ _ \\| \'_ \\ \n') +
                chalk.green.bold('    | || | | | ||  __/ (_| | | | (_| | |_| | (_) | | | |\n') +
                chalk.green.bold('   |___|_| |_|\\__\\___|\\__, |_|  \\__,_|\\__|_|\\___/|_| |_|\n') +
                chalk.green.bold('                      |___/                             \n'));
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
                    {name: 'CircleCI', value: 'circleci'},
                    {name: 'Gitlab-CI', value: 'gitlabci'}
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
        this.applicationType = jhipsterVar.applicationType;
        this.devDatabaseType = jhipsterVar.devDatabaseType;
        this.prodDatabaseType = jhipsterVar.prodDatabaseType;
        this.searchEngine = jhipsterVar.searchEngine;
        this.buildTool = jhipsterVar.buildTool;
        this.testFrameworks = jhipsterVar.testFrameworks;
        this.skipClient = jhipsterVar.skipClient;

        // Create continuous integration files
        if (this.ciType == "circleci") {
            this.template('circle.yml', 'circle.yml', this, {});
        }

        if (this.ciType == "gitlabci") {
            jhipsterFunc.addBowerrcParameter('allow_root', true);
            this.template('.gitlab-ci.yml', '.gitlab-ci.yml', this, {});
        }

        done();
    },

    end: function () {
        switch (this.ciType) {
            case 'circleci': {
                this.log('\n' + chalk.bold.green('##### USAGE #####'));
                this.log('To add your project to a Continuous Integration:');
                this.log('- go to ' + chalk.green('https://circleci.com/\n'));
                break;
            }
        }
    }
});
