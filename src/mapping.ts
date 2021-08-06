import { Bytes } from "@graphprotocol/graph-ts";
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
  gravatar.owner = event.params.owner.toHexString();
  gravatar.idx = event.params.idx;
  gravatar.docCID = event.params.docCID;
  gravatar.verifyingKey = event.params.verifyingKey;
  gravatar.publicKey = event.params.publicKey;
  gravatar.nonce = event.params.nonce;
  gravatar.save();
}

export function handleRequestedAccess(event: RequestedAccess): void {}

export function handleRevokedAccess(event: RevokedAccess): void {}
