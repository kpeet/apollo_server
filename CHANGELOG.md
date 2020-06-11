# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- variables.env [(5)]
- Refactor code, es6 standar [(4)]
- Refactor code move auth model [(8)]
- Update register method (schema and model) [(15)]
- Improove split token [(15)] 

## Added
- Add Srm login with access and refresh token (mutation autenticarUsuario)[(3)]
- Add Srm user register (mutation nuevoUsuario) [(3)]
- Add base project[(3)]
- Add babel, babel configuration [(4)]
- Add Auht handler token middlewares [(7)]
- Add create official class api with bearer headers middleware [(8)]
- Add Query representatives and payerCompanyForRepresentative[()]
- Add Mutation asssignRepresentativeToPayerEnterprise[()]
- Add Mutation newEnterprisePayer[()]
- Add Mutation enterprises, Create Emterprise[()]
- Add Mutation forgotPassword, it allow the change of the user password [(9)]
- Add Mutation confirmForgotPassword, it change the user password[(9)]

### Fixed
- Add environment var to docker-compose [(6)]
- improove refresh and auth process [(8)]
- refactor context instance for aws lambda support [(9)]
- Allow special headers field in cors preflight response [(11)]
- Allow special headers field in cors preflight response [(12)]
- Allow special headers field in cors preflight response [(13)]
- Finish solution cors preflight response [(14)]

### DevOps
- Add node_modules to volumen [()]
- Add docker support [(1)]
- New folder structure [(1)]
- Add CI/CD from codeship [(1)]
- Install serverless offline [(9)]
- Refactor packages [(9)]
- Create server.js main [(9)]
- Update import gql from apollo-server-lambda in schema files [(9)]
- Enabled playground [(10)]
- Add environment api_srm endpoint [(10)]
- Delete environment SECRETA [(10)]

[Unreleased]: https://bitbucket.org/cumplo/srm-apollo-server/branches/compare/devel..#diff

[(1)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/1/
[(3)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/3/
[(4)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/4/
[(5)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/5/
[(6)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/6/
[(7)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/7/
[(8)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/8/
[(9)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/9/
[(10)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/10/
[(11)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/11/
[(12)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/12/
[(13)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/13/
[(14)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/14/
[(15)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/15/
