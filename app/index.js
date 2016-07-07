'use strict'

const superb = require('superb')
const normalizeUrl = require('normalize-url')
const humanizeUrl = require('humanize-url')
const yeoman = require('yeoman-generator')
const kebab = require('lodash.kebabcase')
const camel = require('lodash.camelcase')

module.exports =
  class extends yeoman.Base {
    constructor (a, b) {
      super(a, b)

      this.option('cli', {
        type: 'boolean',
        desc: 'Add a CLI'
      })
    }
    init () {
      return this.prompt([{
        name: 'moduleName',
        message: 'What do you want to name your module?',
        default: this.appname.replace(/\s/g, '-'),
        filter: x => kebab(x)
      }, {
        name: 'githubUsername',
        message: 'What is your GitHub username?',
        store: true,
        validate: x => x.length > 0 ? true : 'You have to provide a username',
        when: () => !this.options.org
      }, {
        name: 'website',
        message: 'What is the URL of your website?',
        store: true,
        validate: x => x.length > 0 ? true : 'You have to provide a website URL',
        filter: x => normalizeUrl(x)
      }, {
        name: 'cli',
        message: 'Do you need a CLI?',
        type: 'confirm',
        default: Boolean(this.options.cli),
        when: () => this.options.cli === undefined
      }]).then(props => {
        const or = (option, prop) => this.options[option] === undefined ? props[prop || option] : this.options[option]

        const cli = or('cli')

        const tpl = {
          moduleName: props.moduleName,
          camelModuleName: camel(props.moduleName),
          githubUsername: this.options.org || props.githubUsername,
          name: this.user.git.name(),
          email: this.user.git.email(),
          website: props.website,
          humanizedWebsite: humanizeUrl(props.website),
          superb: superb(),
          cli
        }

        const mv = (from, to) => {
          this.fs.move(this.destinationPath(from), this.destinationPath(to))
        }

        this.fs.copyTpl([
          `${this.templatePath()}/**`,
          '!**/cli.js'
        ], this.destinationPath(), tpl)

        if (props.cli) {
          this.fs.copyTpl(this.templatePath('cli.js'), this.destinationPath('cli.js'), tpl)
        }

        mv('editorconfig', '.editorconfig')
        mv('gitattributes', '.gitattributes')
        mv('gitignore', '.gitignore')
        mv('travis.yml', '.travis.yml')
        mv('_package.json', 'package.json')
      })
    }
    git () {
      this.spawnCommandSync('git', ['init'])
    }
    install () {
      this.installDependencies({ bower: false })
    }
}
