const main = async () => {
    const addressContractFactory = await hre.ethers.getContractFactory('AddressBook');
    const addressContract = await addressContractFactory.deploy({
        // value: hre.ethers.utils.parseEther('1'),
    });
    await addressContract.deployed();
    console.log('Contract addy:', addressContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();