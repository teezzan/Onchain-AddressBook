const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    const addressContractFactory = await hre.ethers.getContractFactory('AddressBook');
    const addressContract = await addressContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await addressContract.deployed();
    console.log('Contract addy:', addressContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        addressContract.address
    );
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );



    /*
     * Let's try to add addresses now
     */
    let addTxn = await addressContract.addAlias('@teezzan');
    await addTxn.wait();

    let myAlias = await addressContract.getMyAlias();
    console.log("Alias 1 ", myAlias);


    addTxn = await addressContract.connect(randomPerson).addAlias('@JayP');;
    await addTxn.wait();

    let myAlias2 = await addressContract.getAlias(randomPerson.address);
    console.log("Alias 2", myAlias2);

    myAlias = await addressContract.getMyAlias();
    console.log("Alias 1 ", myAlias);

    myAlias2 = await addressContract.getAlias(randomPerson.address);
    console.log("Alias 2", myAlias2);

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