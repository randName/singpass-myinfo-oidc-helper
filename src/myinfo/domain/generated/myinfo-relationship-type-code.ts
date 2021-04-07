// tslint:disable
// =============================================================================
// This file was generated with `npm run generate-myinfo-typings` on 2021-04-07
// Any modifications to this file may be overwritten when the script runs again
// =============================================================================
import { EnumUtils } from "../../../util/EnumUtils";

export enum MyinfoRelationshipTypeCode {
	"HUSBAND" = "REL101",
	"WIFE" = "REL102",
	"MOTHER" = "REL201",
	"FATHER" = "REL202",
	"SON" = "REL401",
	"DAUGHTER" = "REL402",
	"BROTHER" = "REL601",
	"SISTER" = "REL602",
}

export namespace MyinfoRelationshipTypeCode {
	export const fn = {
		keys: EnumUtils.keysFunc<MyinfoRelationshipTypeCode>(MyinfoRelationshipTypeCode),
		values: EnumUtils.valuesFunc<MyinfoRelationshipTypeCode>(MyinfoRelationshipTypeCode),
		toEnumKey: EnumUtils.toEnumKeyFunc<MyinfoRelationshipTypeCode>(MyinfoRelationshipTypeCode),
		toEnumValue: EnumUtils.toEnumValueFunc<MyinfoRelationshipTypeCode>(MyinfoRelationshipTypeCode),
	};
}
