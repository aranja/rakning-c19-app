import Constants from 'expo-constants';

function getConfig() {
  return {
    covidApiUrl: "https://iceland-covid-tracker-api.herokuapp.com"
  }

  // const { packagerOpts } = Constants.manifest;
  // const environment =
  //   packagerOpts && packagerOpts.dev ? 'development' : 'production';
  //
  // return Constants.manifest.extra[environment];
}

export default getConfig();
