# generator-jhipster-ci
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, Continuous Integration support in your JHipster application

<div align="center">
  <a href="http://jhipster.github.io">
    <img src="https://github.com/pascalgrimaud/generator-jhipster-ci/raw/master/images/logo-jhipster.png">
  </a>
  <a href="https://circleci.com/">
    <img width=93px src="https://github.com/pascalgrimaud/generator-jhipster-ci/raw/master/images/circleci.png">
  </a>
  <a href="https://about.gitlab.com/gitlab-ci/">
      <img width=93px src="https://github.com/pascalgrimaud/generator-jhipster-ci/raw/master/images/gitlabci.png">
    </a>
</div>

# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application. This module is used to generate yaml files for Continuous Integration with :

- [CircleCI](https://circleci.com/)
- [Gitlab-CI](https://about.gitlab.com/gitlab-ci/)

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

Depending on the Continuous Integration you choose, you need to have an account on the Cloud Continuous Integration.

# Installation

To install this module:

```bash
npm install -g generator-jhipster-ci
```

To update this module:
```bash
npm update -g generator-jhipster-ci
```

# Usage

To run the module on a JHipster generated application:

```bash
yo jhipster-ci
```

# License

Apache-2.0 © [Pascal Grimaud](https://twitter.com/pascalgrimaud) and the respective JHipster contributors

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-ci.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-ci
[travis-image]: https://travis-ci.org/pascalgrimaud/generator-jhipster-ci.svg?branch=master
[travis-url]: https://travis-ci.org/pascalgrimaud/generator-jhipster-ci
[daviddm-image]: https://david-dm.org/pascalgrimaud/generator-jhipster-ci.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/pascalgrimaud/generator-jhipster-ci
