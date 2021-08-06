import { BigInt } from "@graphprotocol/graph-ts";
import {
  OrangeLife,
  GrantedAccess,
  NewMedicalRecord,
  RequestedAccess,
  RevokedAccess,
} from "../generated/OrangeLife/OrangeLife";
import { MedicalRecord } from "../generated/schema";

export function handleGrantedAccess(event: GrantedAccess): void {}

export function handleNewMedicalRecord(event: NewMedicalRecord): void {
  let gravatar = new MedicalRecord(event.transaction.from.toHex());
  gravatar.owner = event.params.owner;
  gravatar.docCID = event.params.idx;
  gravatar.save();
}

export function handleRequestedAccess(event: RequestedAccess): void {}

export function handleRevokedAccess(event: RevokedAccess): void {}
