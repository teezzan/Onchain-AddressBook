const main = async () => {
    const [randomPerson] = await hre.ethers.getSigners();

    /*
    * Deploy the contract.
    */

    const addressContractFactory = await hre.ethers.getContractFactory('AddressBook');
    const addressContract = await addressContractFactory.deploy({});
    await addressContract.deployed();
    console.log('Contract address:', addressContract.address);

    /*
     * Add address to owner Address
     */
    let addTxn = await addressContract.addAlias('@teezzan');
    await addTxn.wait();

    /*
     * Fetch the Owner's alias 
     */

    let myAlias = await addressContract.getMyAlias();
    console.log("Owner Alias ", myAlias);

    /*
     * Add address as another randomPerson
     */

    addTxn = await addressContract.connect(randomPerson).addAlias('@JayP');
    await addTxn.wait();

    /*
     * Fetch the alias of randomPerson
     */


    let randomPersonAlias = await addressContract.getAlias(randomPerson.address);
    console.log("randomPerson's Alias", randomPersonAlias);

    /*
     * Change the alias of randomPerson
     */

    addTxn = await addressContract.connect(randomPerson).addAlias('@JP');;
    await addTxn.wait();

    /*
     * Fetch the new alias of randomPerson
     */

    randomPersonAlias = await addressContract.getAlias(randomPerson.address);
    console.log("randomPerson's Alias", randomPersonAlias);

    /*
    * Fetch the address via the Alias
    */

    let randomPersonAddress = await addressContract.getAddress('@JP');
    console.log("randomPerson's Address", randomPersonAddress);

    /*
    * Check the current ETH Balance of RandomPerson.
    */

    let balance = await randomPerson.getBalance()
    console.log("randomPerson's Old Balance", balance.toString());

    /*
    * Send Some ETH to RandomPerson.
    */
    let depositTxn = await addressContract.deposit("@JP", {
        value: ethers.utils.parseEther("2.1"),
    });
    await depositTxn.wait();

    /*
    * Check the new ETH Balance of RandomPerson.
    */
    balance = await randomPerson.getBalance()
    console.log("randomPerson's New Balance", balance.toString());

    /*
     * Delete randomPerson's Alias
     */

    addTxn = await addressContract.connect(randomPerson).deleteEntry();
    await addTxn.wait();

    /*
    * Try to Fetch the alias of randomPerson
    */

    randomPersonAlias = await addressContract.getAlias(randomPerson.address);
    console.log(" Deleted randomPerson's Alias", randomPersonAlias);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();