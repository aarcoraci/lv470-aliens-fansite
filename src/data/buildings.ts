import AtmosphereProcessor from '../scene/hadleysHope/elements/AtmosphereProcessor';
import CommsTower from '../scene/hadleysHope/elements/CommsTower';
import District from '../scene/hadleysHope/elements/District';
import LivingQuarters from '../scene/hadleysHope/elements/LivingQuarters';
import Operations from '../scene/hadleysHope/elements/Operations';
import OreProcessing from '../scene/hadleysHope/elements/OreProcessing';
import WorkShop from '../scene/hadleysHope/elements/Workshop';

type BuildingInfo = {
  sceneElementName: String;
  name: String;
  text: String;
};

const buildingDirectory: BuildingInfo[] = [
  {
    name: 'Atmosphere Processor',
    sceneElementName: AtmosphereProcessor.BUILDING_NAME,
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
    sceneElementName: Operations.BUILDING_NAME,
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
    sceneElementName: CommsTower.BUILDING_NAME,
    text: `Every settlement counts with a communication tower. This allows the people 
    of the settlement to get important broadcasts and information about incoming shipments or cargo.
    <br />
    <br />
    In special cases can be used to manually control ships or satellites in orbit though
     this is likely never to be needed.
    `
  },
  {
    name: 'Community District',
    sceneElementName: District.BUILDING_NAME,
    text: `The heart of the colony lies on the Community District. A place to find rest in this
    garden in the stars.
    <br />
    The district counts with several shops and training facilities for those who want to embark on
    a new hobby.
    <br />
    <br />
    We recommend the bakery on the shop 8-C. Their bagels can last weeks without going bad!.
    `
  },
  {
    name: 'Ore Processing',
    sceneElementName: OreProcessing.BUILDING_NAME,
    text: `The main activity of the settlement revolves around mining hard to find ores in the rest of the system.
    <br />
    <br />
    Workers assigned to this facility are in charge of gathering, refining, purifying and packing minerals for later
    use or shipment to the rest of the colonies.
    `
  },
  {
    name: 'Living Quarters',
    sceneElementName: LivingQuarters.BUILDING_NAME,
    text: `All personal and officers have their living units assigned on this building.
    High tier members quarters are located on the west wing while miners and workers on 
    north.
    <br />
    <br />
    The building offer some comfort facilities and it's common to see the worker's families
    gathering around them. Just don't leave your kids on the upper decks !.
    `
  },
  {
    name: 'The Workshop',
    sceneElementName: WorkShop.BUILDING_NAME,
    text: `The Workshop is not only used to keep the colony's vehicles fine tuned but also any 
    device or facility that may require maintenance or fixing.
    <br />
    <br />
    Workers assigned to this building have the task of overseeing our land vehicles which can travel
    long distances and have their own life support system. A Family of 4 could take a trip around the 
    planet if desired!
    `
  }
];

export { BuildingInfo, buildingDirectory };
