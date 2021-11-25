const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Address Book", async () => {
  let addressContract;
  let randomPerson;

  before(async () => {
    let signers = await ethers.getSigners();
    randomPerson = signers[1];

    const addressContractFactory = await ethers.getContractFactory('AddressBook');
    addressContract = await addressContractFactory.deploy({});
    await addressContract.deployed();
    console.log('Contract address:', addressContract.address);
  });


  it("Should add a new alias to owner's address", async () => {

    let addTxn = await addressContract.addAlias('@teezzan');
    await addTxn.wait();

    expect(await addressContract.getMyAlias()).to.equal("@teezzan");
  });

  it("Should add a new alias to a randomPerson's address", async () => {

    let addTxn = await addressContract.connect(randomPerson).addAlias('@JayP');
    await addTxn.wait();

    expect(await addressContract.getAlias(randomPerson.address)).to.equal("@JayP");
  });

  it("Should change the alias of randomPerson's address", async () => {
    let addTxn = await addressContract.connect(randomPerson).addAlias('@JP');
    await addTxn.wait();

    expect(await addressContract.getAlias(randomPerson.address)).to.equal("@JP");
  });

  it("Should fetch randomPerson's address by its Alias", async () => {
    expect(await addressContract.getAddress('@JP')).to.equal(randomPerson.address);
  });

  it("Should send ETH to @JP", async () => {

    let old_balance = await randomPerson.getBalance()

    let depositTxn = await addressContract.deposit("@JP", {
      value: ethers.utils.parseEther("2.1"),
    });
    await depositTxn.wait();

    let new_balance = await randomPerson.getBalance()

    expect(parseInt(new_balance.toString())).to.greaterThan(parseInt(old_balance.toString()));
  });


});
