//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AddressBook {
    mapping(address => string) public addressToAlias;
    mapping(string => address) public aliasToAddress;

    constructor() payable {
        console.log("We have been constructed!");
    }

    function addAlias(string memory _alias) public {
        // require (bytes(aliasToAddress[_alias]).length == 0, "Alias Taken");
        require(aliasToAddress[_alias] == address(0), "Alias Taken");
        delete aliasToAddress[addressToAlias[msg.sender]];
        addressToAlias[msg.sender] = _alias;
        aliasToAddress[_alias] = msg.sender;
    }

    function getMyAlias() public view returns (string memory) {
        return addressToAlias[msg.sender];
    }

    function getAlias(address _addr1) public view returns (string memory) {
        return addressToAlias[_addr1];
    }

    function getAddress(string memory _alias) public view returns (address) {
        return aliasToAddress[_alias];
    }

    function deleteEntry() public {
        require(
            bytes(addressToAlias[msg.sender]).length != 0,
            "No Alias Existing"
        );
        delete aliasToAddress[addressToAlias[msg.sender]];
        delete addressToAlias[msg.sender];
    }

    function deposit(string memory _alias) public payable {
        require(aliasToAddress[_alias] != address(0), "Alias Not On Record!");
        require(msg.value > 0, "Cant Send Zero Eth!");
        (bool success, ) = (aliasToAddress[_alias]).call{value: msg.value}("");
        require(success, "Failed to withdraw money from contract.");
    }
}
