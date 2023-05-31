function CalculatePollutants(components) {
  let total = 0;
  Object.entries(components).map(([key, value]) => {
    total += value;
    return key;
  });
  return (Math.round(total * 100) / 100).toFixed(2);
}

function TotalPollutants(components) {
  let total = 0;
  components.map((component) => {
    let tot = 0;
    Object.entries(component.components).map(([key, value]) => {
      tot += value;
      return key;
    });
    total += tot;
    return null;
  });
  return (Math.round(total * 100) / 100).toFixed(2);
}

export {
  CalculatePollutants,
  TotalPollutants,
};
