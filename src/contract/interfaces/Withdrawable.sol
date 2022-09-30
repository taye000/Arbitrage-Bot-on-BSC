// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.6.0;

//Allows other contracts to withdraw the funds from this contract in case of stuck or incorrect funds

import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.1.0/contracts/token/ERC20/ERC20.sol';
import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.1.0/contracts/token/ERC20/SafeERC20.sol';
import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.1.0/contracts/access/Ownable.sol';

contract Withdrawable is Ownable {
    using SafeERC20 for ERC20;
    address constant ETHER = address(0);

    event LogWithdraw(
        address indexed _from,
        address indexed _assetAddress,
        uint amount
    );
    function withdraw(address _assetAddress) public onlyOwner{
        uint assetBalance;
        if(_assetAddress == ETHER){
            address self = address(this);
            assetBalance = self.balance;
            payable(msg.sender).transfer(assetBalance);
    } else {
        assetBalance = ERC20(_assetAddress).balanceOf(address(this));
        ERC20(_assetAddress).safeTransfer(msg.sender, assetBalance);
    }
    emit LogWithdraw(msg.sender, _assetAddress, assetBalance);
    }
}