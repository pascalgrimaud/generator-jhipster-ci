'use strict';
var util = require('util');
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var deps = [
    [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('JHipster generator CI', function () {
    describe('CircleCI', function () {
        before(function (done) {
            helpers
            .run(path.join( __dirname, '../generators/app'))
            .inTmpDir(function (dir) {
                fse.copySync(path.join(__dirname, '../test/templates/01-h2-mysql'), dir)
            })
            .withOptions({
                testmode: true
            })
            .withPrompts({
                ciType: 'circleci'
            })
            .withGenerators(deps)
            .on('end', done);
        });

        it('generates Dockerfile', function () {
            assert.file('circle.yml');
        });
    });

    describe('gitlab', function () {
        before(function (done) {
            helpers
            .run(path.join( __dirname, '../generators/app'))
            .inTmpDir(function (dir) {
                fse.copySync(path.join(__dirname, '../test/templates/01-h2-mysql'), dir)
            })
            .withOptions({
                testmode: true
            })
            .withPrompts({
                ciType: 'gitlabci'
            })
            .withGenerators(deps)
            .on('end', done);
        });

        it('generates Dockerfile', function () {
            assert.file('.gitlab-ci.yml');
        });
    });
});
