import {
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
  medRecord.docName = event.params.docName;
  medRecord.docMimeType = event.params.docMimeType;
  medRecord.extraData = event.params.extraData;
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
  let hasAccess = medRecord.hasAccess;
  // owner is actually addrToRevoke
  let addrToRevoke = event.params.owner.toHexString();
  let index = hasAccess.indexOf(addrToRevoke);
  if (index > -1) {
    hasAccess.splice(index, 1);
  }
  medRecord.hasAccess = hasAccess;
  medRecord.save();
}
