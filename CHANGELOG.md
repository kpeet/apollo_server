# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## Added
- Add Mutation newEnterpriseProvider[(29)]
- Add Mutation asssignRepresentativeToProviderEnterprise[(29)]
- Add Mutation setRepresentativeFavoriteProvider[(29)]
- Add query getPayerListFromProvider[(30)]
- Add query getProviderListFromPayer[(30)]
- Add query providerCompanyForRepresentative[(33)]
- Add eslint plugin and airbnb base rules [(35)]
- Add prettier plugin for beautiful code [(35)]
- Add Confirmed payment attempt, used for advance[(37)]
- fix Confirmed payment attempt response[(38)]
- add Bank in attempt[(39)]
fix Confirmed payment attempt with multi Confirmed payment [(40)]

### Changed
- Change input of asssignRepresentativeToPayerEnterprise service [(29)]
- Change input of asssignRepresentativeToPayerEnterprise service [(29)]
- Change confirmedPayment in model, POST to PUT method [(29)]
- Change setRepresentativeFavoritePayer in model, POST to PUT method [(29)]

## [v1.0.0] - 2020-06-19

### Changed
- variables.env [(5)]
- Refactor code, es6 standar [(4)]
- Refactor code move auth model [(8)]
- Update register method (schema and model) [(15)]
- Improove split token [(15)]
- Improve method providers by representative [(33)]

## Added
- Add Srm login with access and refresh token (mutation autenticarUsuario)[(3)]
- Add Srm user register (mutation nuevoUsuario) [(3)]
- Add base project[(3)]
- Add babel, babel configuration [(4)]
- Add Auht handler token middlewares [(7)]
- Add create official class api with bearer headers middleware [(8)]
- Add Query representatives and payerCompanyForRepresentative[(16)]
- Add Mutation asssignRepresentativeToPayerEnterprise[(16)]
- Add Mutation newEnterprisePayer[(16)]
- Add Mutation enterprises, Create Emterprise[(16)]
- Add Mutation forgotPassword, it allow the change of the user password [(16)]
- Add Mutation confirmForgotPassword, it change the user password[(16)]
- Add Mutation confirmedPayment(POST)[(17)]
- Add Query confirmedPayment[(17)]
- Add Mutation setRepresentativeFavoritePayer[(19)]
- Add service close confirmed payment [(21)]
- Add state filter to confirmed payment [(22)]
- Add confirmedPaymentDetail [(23)]
- Add field state to confirmedPayment's query[(25)]
- Add representative_document_number on ConfirmedPayment[(26)]

### Fixed
- Add environment var to docker-compose [(6)]
- improove refresh and auth process [(8)]
- refactor context instance for aws lambda support [(9)]
- Allow special headers field in cors preflight response [(11)]
- Allow special headers field in cors preflight response [(12)]
- Allow special headers field in cors preflight response [(13)]
- Finish solution cors preflight response [(14)]
- Fix detail on payer company [(20)]

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
[(34)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/34/
[(35)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/35/

[v1.0.0]: https://bitbucket.org/cumplo/api-srm/branch/release/v1.0.0

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
[(16)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/16/
[(17)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/17/
[(19)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/19/
[(20)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/20/
[(21)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/21/
[(22)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/22/
[(23)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/23/
[(25)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/25/
[(26)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/26/
[(29)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/29/
[(30)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/30/
[(33)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/33/
[(37)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/37/
[(38)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/38/
[(39)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/39/
[(40)]: https://bitbucket.org/cumplo/srm-apollo-server/pull-requests/40/
