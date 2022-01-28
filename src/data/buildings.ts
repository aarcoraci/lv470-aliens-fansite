type BuildingInfo = {
  sceneElementName: String;
  name: String;
  text: String;
};

const buildingDirectory: BuildingInfo[] = [
  {
    name: 'Atmosphere Processor',
    sceneElementName: 'atmosphere_processor',
    text: `This large building is an automated reactor capable of converting 
    an unbreathable, toxic or otherwise inhospitable atmosphere into one 
    suitable for humans.
    <br />
    <br />
    The structure is built in a way to ensure the reactor will always be safe. Not even a ship
    crash could compromise it.`
  },
  {
    name: 'Operations',
    sceneElementName: 'operations',
    text: `This is the main headquarter from where our most capable personal
    oversees everything that happens on the settlement.
    <br />
    <br />
    No task is too big or too small for our officers and scientists and when in doubt
    ask: you will get a fast and reliable response.
    `
  },
  {
    name: 'Communication Tower',
    sceneElementName: 'comms_tower',
    text: `Every settlement counts with a communication tower. This allows the people 
    of the settlement to get important broadcasts and information about incoming shipments or cargo.
    <br />
    <br />
    Unfortunately it does not provide entertainment content. Just official communications. 
    <br />
    <br />
    In special cases can be used to manually control ships or satellites in orbit though
     this is more likely never to be needed.
    `
  },
  {
    name: 'Community District',
    sceneElementName: 'district',
    text: `The heart of the colony lies on the Community District. A place to find rest in this
    garden in the stars.
    <br />
    <br />
    The district counts with several shops and training facilities for those who want to embark on
    a new hobby.
    <br />
    <br />
    We recommend the bakery on the shop 8-C. Their bagels can last weeks without going bad!.
    `
  }
];

export { BuildingInfo, buildingDirectory };
