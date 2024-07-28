const translate = require("@iamtraction/google-translate");

translate('Thank you', { from: 'en', to: 'fr' }).then(res => {
  console.log(res.text); // OUTPUT: ''
  console.log(res.from.autoCorrected); // OUTPUT: false
  console.log(res.from.text.value); // OUTPUT: [Thank] you
  console.log(res.from.text.didYouMean); // OUTPUT: true
}).catch(err => {
  console.error(err);
});
