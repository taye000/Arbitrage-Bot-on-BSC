// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.6.0;

//Points to the aave lending pools that will fund the flash loan
//provides the interface to fetch the lendingpoolcore addresses

interface ILendingPoolAddressesProvider {
    function getLendingPoolCore() external view returns(address payable);
    function getLendingPool() external view returns(address);
}