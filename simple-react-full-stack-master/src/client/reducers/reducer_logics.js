let allOrgTemp = [];
export function mapOrganisationToTenant(unMappedTenant) {
    let ttoSibling = [];
    let ltoSibling = [];
    let TenantObj = {};
    allOrgTemp.map(i => {
       if(i.tenantId === unMappedTenant.id && i.level == 0){
            ttoSibling.push(i.name);
       } else if (i.tenantId === unMappedTenant.id && !i.level == 0) {
            ltoSibling.push(i.name);           
       }
    });
    TenantObj.id = unMappedTenant.id;
    TenantObj.name = unMappedTenant.name;
    TenantObj.topLevelOrg = ttoSibling;
    TenantObj.lowerLevelOrg = ltoSibling;
    TenantObj.selected = false;
    completeTenantList.push(TenantObj);
}