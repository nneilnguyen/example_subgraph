import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ERC20 } from "../types/Factory/ERC20";
import { ERC20NameBytes } from "../types/Factory/ERC20NameBytes";
import { ERC20SymbolBytes } from "../types/Factory/ERC20SymbolBytes";

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractNameBytes = ERC20NameBytes.bind(tokenAddress);

  let nameValue = "unknown";
  let nameResult = contract.try_name();

  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name();

    if (!nameResultBytes.reverted) {
      nameValue = nameResultBytes.value.toString();
    }
  } else {
    nameValue = nameResult.value;
  }

  return nameValue;
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);

  let symbolValue = "unknown";
  let symbolResult = contract.try_symbol();

  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol();

    if (!symbolResultBytes.reverted) {
      symbolValue = symbolResultBytes.value.toString();
    }
  } else {
    symbolValue = symbolResult.value;
  }

  return symbolValue;
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);

  let decimalValue = BigInt.fromI32(0);
  let decimalResult = contract.try_decimals();

  if (decimalResult.reverted) {
  } else {
    decimalValue = BigInt.fromI32(decimalResult.value);
  }

  return decimalValue;
}
