import { Bytes } from "@graphprotocol/graph-ts";
import {
  OrangeLife,
  GrantedAccess,
  NewMedicalRecord,
  RequestedAccess,
  RevokedAccess,
} from "../generated/OrangeLife/OrangeLife";
import { MedicalRecord } from "../generated/schema";

export function handleNewMedicalRecord(event: NewMedicalRecord): void {
  let medRecord = new MedicalRecord(event.params.docCID);
  medRecord.owner = event.params.owner.toHexString();
  medRecord.idx = event.params.idx;
  medRecord.docCID = event.params.docCID;
  medRecord.verifyingKey = event.params.verifyingKey;
  medRecord.publicKey = event.params.publicKey;
  medRecord.nonce = event.params.nonce;
  medRecord.hasAccess = [medRecord.owner];
  medRecord.accessRequested = [];
  medRecord.save();
}

export function handleRequestedAccess(event: RequestedAccess): void {
  let medRecord = MedicalRecord.load(event.params.docCID);
  let accessRequested = medRecord.accessRequested;
  accessRequested.push(event.params.requestor.toHexString());
  medRecord.accessRequested = accessRequested;
  medRecord.save();
}

export function handleGrantedAccess(event: GrantedAccess): void {
  let medRecord = MedicalRecord.load(event.params.docCID);
  let hasAccess = medRecord.hasAccess;
  // owner is actually addrToGrant
  hasAccess.push(event.params.owner.toHexString());
  medRecord.hasAccess = hasAccess;
  medRecord.save();
}

export function handleRevokedAccess(event: RevokedAccess): void {
  let medRecord = MedicalRecord.load(event.params.docCID);
  // owner is actually addrToRevoke
  medRecord.hasAccess = medRecord.hasAccess.filter((addr) => {
    return addr != event.params.owner.toHexString();
  });
  medRecord.save();
}
