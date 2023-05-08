import { PoolCreated } from "../types/Factory/Factory";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Factory, Pool, Token } from "../types/schema";
import { FACTORY_ADDRESS } from "../utils/constants";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
} from "../utils/token";

export function handlePoolCreated(event: PoolCreated): void {
  // temp fix
  if (
    event.params.pool ==
    Address.fromHexString("0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248")
  ) {
    return;
  }

  let factory = Factory.load(FACTORY_ADDRESS);

  if (factory === null) {
    factory = new Factory(FACTORY_ADDRESS);

    factory.poolCount = BigInt.fromI32(0);
  }

  factory.poolCount = factory.poolCount.plus(BigInt.fromI32(1));

  let pool = new Pool(event.params.pool.toHexString());
  let token0 = Token.load(event.params.token0.toHexString());
  let token1 = Token.load(event.params.token1.toHexString());

  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString());
    token0.name = fetchTokenName(event.params.token0);
    token0.symbol = fetchTokenSymbol(event.params.token0);
    token0.decimal = fetchTokenDecimals(event.params.token0);
  }

  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString());
    token1.name = fetchTokenName(event.params.token1);
    token1.symbol = fetchTokenSymbol(event.params.token1);
    token1.decimal = fetchTokenDecimals(event.params.token1);
  }

  pool.token0 = token0.id;
  pool.token1 = token1.id;

  pool.save();
  token0.save();
  token1.save();
  factory.save();
}
