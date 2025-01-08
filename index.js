const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));

});
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = (req.query.isMember);
  let result;
  if(isMember === "true"){
    result=cartTotal-360
  }else{
    result=cartTotal
  }
  res.send(result.toString());

})
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = 5 / 100;
  let taxAmount = cartTotal * tax;
  res.send(taxAmount.toString());

});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = (req.query.shippingMethod);
  let distance = parseFloat(req.query.distance);
  let result;
  if(shippingMethod === 'Standard'){
  result = distance / 50;
  }else if(shippingMethod === 'Express'){
    result = distance / 100;
  }
  res.send(result.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2 ;
  res.send(loyaltyPoints.toString());

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
