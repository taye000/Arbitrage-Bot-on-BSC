// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.6.0;

//Allows the contract to receive funds for the flash loan
interface IFlashLoanReceiver {
    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee
    ) external;
}