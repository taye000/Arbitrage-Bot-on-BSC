// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.6.0;

//Allows the contract to receive funds for the flash loan

import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.1.0/contracts/math/SafeMath.sol';
import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.1.0/contracts/token/ERC20/IERC20.sol';
import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.1.0/contracts/token/ERC20/SafeERC20.sol';

import "./IFlashLoanReceiver.sol";
import "./ILendingPoolAddressesProvider.sol";
import "./Withdrawable.sol";


//Base contract to develop a flashloan-receiver contract
abstract contract FlashLoanReceiverBase is IFlashLoanReceiver, Withdrawable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    address constant ethAddress = 0x1000000000000000000000000000000000000001;
    ILendingPoolAddressesProvider public addressesProvider;

    constructor(address _addressesProvider) {
        addressesProvider = ILendingPoolAddressesProvider(_addressesProvider);
    }

    receive() payable external{}

    function transferFundsBackToPoolInternal(address _reserve, uint256 _amount) internal {
        address payable core = addressesProvider.getLendingPoolCore();
        transferInternal(core, _reserve, _amount);
    }

    function transferInternal(address _destination, address _reserve, uint256 _amount) internal {
        if(_reserve == ethAddress){
            (bool success, ) = _destination.call{value: _amount}("");
            require(success == true, "Failed to transfer ETH");
            return;
        }
        IERC20(_reserve).safeTransfer(_destination, _amount);
    }

    function getBalanceInternal (address _target, address _reserve) internal view returns(uint256){
        if(_reserve == ethAddress){
            return _target.balance;
        }
        return IERC20(_reserve).balanceOf(_target);
    }


}