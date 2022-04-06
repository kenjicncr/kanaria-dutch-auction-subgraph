import { Address, BigInt, ByteArray, Bytes, log, Value } from '@graphprotocol/graph-ts'
import { BuyCall, ItemBought } from './types/KanariaDutchAuction/dutchAuctionAbi'
import { BoughtSlot } from './types/schema'

export function handleItemBought(event: ItemBought): void  {
  let itemId: string = event.params.itemId.toString();
  let purchaser: Address = event.params.purchaser;
  let price: BigInt = event.params.price;
  let timestamp: BigInt = event.block.timestamp;
  let txHash: string = event.transaction.hash.toHexString();

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

export function handleBuy(call: BuyCall): void  {
  let txHash: string = call.transaction.hash.toHexString();
  let itemId: string = call.inputs._kanariaId

  let boughtSlot = BoughtSlot.load(txHash)

  if(boughtSlot === null) {
    boughtSlot = new BoughtSlot(txHash)
    boughtSlot.itemId = itemId
    boughtSlot.save()
  } else {
    boughtSlot.itemId = itemId
    boughtSlot.save()
  }
}