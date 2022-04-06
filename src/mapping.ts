import { Address, BigInt, ByteArray, Bytes, log, Value } from '@graphprotocol/graph-ts'
import { ItemBought } from './types/KanariaDutchAuction/dutchAuctionAbi'
import { BoughtSlot } from './types/schema'

export function handleItemBought(event: ItemBought): void  {
  let itemId: string = event.params.itemId.toHexString();
  let purchaser: Address = event.params.purchaser;
  let price: BigInt = event.params.price;
  let timestamp: BigInt = event.block.timestamp;
  let txHash: string = event.transaction.hash.toString();

  let boughtSlot = BoughtSlot.load(txHash)

  if(boughtSlot === null) {
    boughtSlot = new BoughtSlot(txHash)
    boughtSlot.price = price
    boughtSlot.itemId = itemId
    boughtSlot.purchaser = purchaser
    boughtSlot.timeBought = timestamp
    boughtSlot.save()
  }
}