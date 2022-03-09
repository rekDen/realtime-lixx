const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");

const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

const querySpec = {
  query:
    "SELECT c.ISININDEX, c.INDEXREPORTDATE, c.INDEXREPORTTIME, c.INDEXPRICE from c WHERE c.ISININDEX like '%SLA%' ORDER BY c._ts DESC OFFSET 0 LIMIT 10",
};

// query to return all items

class Connection {
  getQuery = async () => {
    console.log("querying");

    //const { body: containerList } = await database.containers.readAll();
    //const { body: containerList } = await database.containers.readAll();
    const { resources } = await container.items.query(querySpec).fetchAll();
    //console.log("resources.length", resources.length);
    console.log("resources", resources);
  };
}

const p = new Connection();
p.getQuery();

/*
// read all items in the Items container
 = await container.items.query(querySpec).fetchAll();

items.forEach((item) => {
  console.log(`${item.id} - ${item.description}`);
});
*/
