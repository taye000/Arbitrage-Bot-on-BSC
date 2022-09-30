// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.6.0;

//Will have the ExecuteOperation function that will be called by the LendingPool contract
//to complete the operations that will use the funds from the loan

import "./FlashLoanReceiverBase.sol";
import "./ILendingPoolAddressesProvider.sol";
import "./ILendingPool.sol";

contract Flashloan is FlashLoanReceiverBase {
    using SafeMath for uint256;
    constructor(address _addressProvider) FlashLoanReceiverBase(_addressProvider) {}

    //this function is called after your contract has received the funds from the loan
    function executeOperation(address _reserve, uint256 _amount, uint256 _fee) external override{
        require(_amount <= getBalanceInternal(address(this), _reserve), "Not enough balance");

        //ToDO: logic should go here

        uint totalDebt =  _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
    }

    function flashloan(address _asset) public onlyOwner {
        bytes memory data = "";
        uint amount = 1 ether;

        ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
        lendingPool.flashloan(address(this), _asset, amount, data);
    }
}