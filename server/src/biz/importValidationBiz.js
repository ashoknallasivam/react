'use strict';



exports.validateForImport = (project) => {//considering file extenstion(.json) already checked
    if(project.hasOwnProperty("id") && project.hasOwnProperty("name") && project.hasOwnProperty("statusFlag") && project.hasOwnProperty("projectStatus") && project.hasOwnProperty("userId") && project.hasOwnProperty("orgs")){
        let projectLevelValidation = validateProjectLevel(project.id, project.name, project.statusFlag, project.projectStatus, project.userId);
        let orgsLevelValidation = validateOrgsLevel(project.orgsList);
        if(projectLevelValidation && orgsLevelValidation){
            return true
        } else {
            return false
        }
    }
}

function validateProjectLevel(id, name, statusFlag, projectStatus, userId) {//working
    let projectLevelStatus = {};
    if((typeof id ==="string" || typeof id ==="number") && id !== ""){
        projectLevelStatus.id = true;
    }else{
        projectLevelStatus.id = false;
    }
    if(typeof name ==="string"){
        projectLevelStatus.name = true;
    }else{
        projectLevelStatus.name = false;
    }
    if(typeof statusFlag ==="string"){
        projectLevelStatus.statusFlag = true;
    }else{
        projectLevelStatus.statusFlag = false;
    }
    if(typeof projectStatus ==="string" && (projectStatus === "save" || projectStatus === "")){
        projectLevelStatus.projectStatus = true;
    }else{
        projectLevelStatus.projectStatus = false;
    }
    if(typeof userId ==="string"){
        projectLevelStatus.userId = true;
    }else{
        projectLevelStatus.userId = false;
    }
    if(projectLevelStatus.id && projectLevelStatus.name && projectLevelStatus.statusFlag && projectLevelStatus.projectStatus && projectLevelStatus.userId){
        return true;
    }else {
        return false;
    }
}


function validateOrgsLevel(orgsList) {//working
    let finalStatus = [];
    for (let i = 0; i < orgsList.length; i++) {
        let oneOrganization = orgsList[i];
        const {id, name, level, parentId, roles, statusFlag, tenantId, ttoId, userId, enrollmentTargets, raConfig} = oneOrganization;
        let orgLevelStatus = {};
        if((typeof id ==="string" || typeof id ==="number") && id !== ""){
            orgLevelStatus.id = true;
        }else{
            orgLevelStatus.id = false;
        }
        if(typeof name ==="string"  && name !== ""){
            orgLevelStatus.name = true;
        }else{
            orgLevelStatus.name = false;
        }
        if(typeof statusFlag ==="string" && statusFlag !== ""){
            orgLevelStatus.statusFlag = true;
        }else{
            orgLevelStatus.statusFlag = false;
        }
        if(typeof level === "number" && level !== ""){
            orgLevelStatus.level = true;
        }else{
            orgLevelStatus.level = false;
        }
        if(typeof userId ==="string" && userId !== ""){
            orgLevelStatus.userId = true;
        }else{
            orgLevelStatus.userId = false;
        }
        if(typeof parentId ==="number" || parentId === null){
            orgLevelStatus.parentId = true;
        }else{
            orgLevelStatus.parentId = false;
        }
        if(typeof ttoId ==="number" || ttoId === null){
            orgLevelStatus.ttoId = true;
        }else{
            orgLevelStatus.ttoId = false;
        }
        if(typeof tenantId ==="number" || tenantId === null){
            orgLevelStatus.tenantId = true;
        }else{
            orgLevelStatus.tenantId = false;
        }
        if(Array.isArray(roles) && validateRoleSchema(roles)){
            orgLevelStatus.roles = true;
        }else{
            orgLevelStatus.roles = false;
        }
        if(Array.isArray(enrollmentTargets) && validateEnrollmentTargetSchema(enrollmentTargets)){
            orgLevelStatus.enrollmentTargets = true;
        }else{
            orgLevelStatus.enrollmentTargets = false;
        }
        if(Array.isArray(raConfig) && validateRaConfigSchema(raConfig)){
            orgLevelStatus.raConfig = true;
        }else{
            orgLevelStatus.raConfig = false;
        }
        finalStatus.push(orgLevelStatus);
        let returnValues = finalStatus.map(item => {
            const {id, name, level, parentId, roles, statusFlag, tenantId, ttoId, userId, enrollmentTargets} = item;
            if(id && name && level && parentId && roles && statusFlag && tenantId && ttoId && userId && enrollmentTargets){
                return true;
            }else  {
                return false
            }
        })//this will return a list of boolean
    
        if(returnValues.includes(false)){
            return false;
        }else{
            return true;
        }
    }
}


function validateRoleSchema(roles) {//verified this function is working
    let finalStatus = [];
    for (let i = 0; i < roles.length; i++) {
        let oneRole = roles[i];
        const {id, name, description,orgId, isAssignable, isAutoAccess, isAutoAssignOnIntake, menus, resources} = oneRole;//also convert isassignable array to number
        let roleLevelStatus = {};
        if((typeof id ==="string" || typeof id ==="number") && id !== ""){
            roleLevelStatus.id = true;
        }else{
            roleLevelStatus.id = false;
        }
        if(typeof name ==="string" && name !== ""){
            roleLevelStatus.name = true;
        }else{
            roleLevelStatus.name = false;
        }
        if(typeof description ==="string"){
            roleLevelStatus.description = true;
        }else{
            roleLevelStatus.description = false;
        }
        if((typeof orgId ==="string" || typeof orgId ==="number")  && orgId !== ""){
            roleLevelStatus.orgId = true;
        }else{
            roleLevelStatus.orgId = false;
        }
        if(typeof isAssignable ==="object" && Array.isArray(isAssignable.data) && typeof isAssignable.data[0] === "number"){
            roleLevelStatus.isAssignable = true;
        }else{
            roleLevelStatus.isAssignable = false;
        }
        if(typeof isAutoAccess ==="object" && Array.isArray(isAutoAccess.data) && typeof isAutoAccess.data[0] === "number"){
            roleLevelStatus.isAutoAccess = true;
        }else{
            roleLevelStatus.isAutoAccess = false;
        }
        if(typeof isAutoAssignOnIntake ==="object" && Array.isArray(isAutoAssignOnIntake.data) && typeof isAutoAssignOnIntake.data[0] === "number"){
            roleLevelStatus.isAutoAssignOnIntake = true;
        }else{
            roleLevelStatus.isAutoAssignOnIntake = false;
        }
        if(Array.isArray(menus) && validateMenuSchema(menus)){
            roleLevelStatus.menus = true;
        }else{
            roleLevelStatus.menus = false;
        }
        if(Array.isArray(resources) && validateResourceSchema(resources)){
            roleLevelStatus.resources = true;
        }else{
            roleLevelStatus.resources = false;
        }
        finalStatus.push(roleLevelStatus);
    }
    let returnValues = finalStatus.map(item => {
        const {id, name, description,orgId, isAssignable, isAutoAccess, isAutoAssignOnIntake, menus, resources} = item;
        if(id && name && description &&orgId && isAssignable && isAutoAccess && isAutoAssignOnIntake && menus && resources){
            return true;
        }else  {
            return false
        }
    })//this will return a list of boolean

    if(returnValues.includes(false)){
        return false;
    }else{
        return true;
    }
}

function validateMenuSchema(menus) {//verified this function is working
    let finalStatus = [];
    for (let i = 0; i < menus.length; i++) {
        let oneMenu = menus[i];
        const {id, roleId, menuId} = oneMenu;
        let menuLevelStatus = {};
        if((typeof id ==="string" || typeof id ==="number") && id !== ""){
            menuLevelStatus.id = true;
        }else{
            menuLevelStatus.id = false;
        }
        if((typeof roleId ==="string" || typeof roleId ==="number") && roleId !== ""){
            menuLevelStatus.roleId = true;
        }else{
            menuLevelStatus.roleId = false;
        }
        if((typeof menuId ==="string" || typeof menuId ==="number") && menuId !== ""){
            menuLevelStatus.menuId = true;
        }else{
            menuLevelStatus.menuId = false;
        }
        finalStatus.push(menuLevelStatus);
    }
    let returnValues = finalStatus.map(item => {
        const {id, roleId, menuId} = item;
        if(id && roleId && menuId){
            return true;
        }else  {
            return false
        }
    })//this will return a list of boolean

    if(returnValues.includes(false)){
        return false;
    }else{
        return true;
    }
}

function validateResourceSchema(resources) {//verified this function is working
    let finalStatus = [];
    for (let i = 0; i < resources.length; i++) {
        let oneResouce = resources[i];
        const {id, roleId, resourceId} = oneResouce;
        let resourceLevelStatus = {};
        if((typeof id ==="string" || typeof id ==="number") && id !== ""){
            resourceLevelStatus.id = true;
        }else{
            resourceLevelStatus.id = false;
        }
        if((typeof roleId ==="string" || typeof roleId ==="number") && roleId !== ""){
            resourceLevelStatus.roleId = true;
        }else{
            resourceLevelStatus.roleId = false;
        }
        if((typeof resourceId ==="string" || typeof resourceId ==="number") && resourceId !== ""){
            resourceLevelStatus.resourceId = true;
        }else{
            resourceLevelStatus.resourceId = false;
        }
        finalStatus.push(resourceLevelStatus);
    }
    let returnValues = finalStatus.map(item => {
        const {id, roleId, resourceId} = item;
        if(id && roleId && resourceId){
            return true;
        }else  {
            return false
        }
    })//this will return a list of boolean

    if(returnValues.includes(false)){
        return false;
    }else{
        return true;
    }
}

function validateEnrollmentTargetSchema(enrollmentTargets) {//verified, this function is working
    let finalStatus = [];
    for (let i = 0; i < enrollmentTargets.length; i++) {
        const { id, orgId, month, target } = enrollmentTargets[i];
        let enrollmentLevelStatus = {};
        if ((typeof id === "string" || typeof id === "number") && id !== "") {
            enrollmentLevelStatus.id = true;
        } else {
            enrollmentLevelStatus.id = false;
        }
        if ((typeof orgId === "string" || typeof orgId === "number") && orgId !== "") {
            enrollmentLevelStatus.orgId = true;
        } else {
            enrollmentLevelStatus.orgId = false;
        }
        if (typeof month === "string" && month !== "") {
            enrollmentLevelStatus.month = true;
        } else {
            enrollmentLevelStatus.month = false;
        }
        if (typeof target === "number" && target !== "") {
            enrollmentLevelStatus.target = true;
        } else {
            enrollmentLevelStatus.target = false;
        }
        finalStatus.push(enrollmentLevelStatus);
    }
    let returnValues = finalStatus.map(item => {
        const {id, orgId, month, target} = item;
        if(id && orgId && month && target){
            return true;
        }else  {
            return false
        }
    })//this will return a list of boolean

    if(returnValues.includes(false)){
        return false;
    }else{
        return true;
    }
}

function validateRaConfigSchema(raConfig) {//verified, this funtion is working
    let finalStatus = [];
    for (let i = 0; i < raConfig.length; i++) {
        const {_id, description, stratum, blockSize, groups} = raConfig[i];
        let raConfigLevelStatus = {};
        if((typeof _id ==="string" || typeof _id ==="number") && _id !== ""){
            raConfigLevelStatus._id = true;
        }else{
            raConfigLevelStatus._id = false;
        }
        if(typeof description ==="string"  && description !== ""){
            raConfigLevelStatus.description = true;
        }else{
            raConfigLevelStatus.description = false;
        }
        if(Array.isArray(stratum) && typeof stratum[0].value === "number" && stratum[0].variable === "ltoId"){
            raConfigLevelStatus.stratum = true;
        }else{
            raConfigLevelStatus.stratum = false;
        }
        if((typeof blockSize ==="string" || typeof blockSize ==="number") && blockSize !== ""){
            raConfigLevelStatus.blockSize = true;
        }else{
            raConfigLevelStatus.blockSize = false;
        }
        if(Array.isArray(groups) && validateRaAconfigGroupsSchema(groups)){
            raConfigLevelStatus.groups = true;
        }else{
            raConfigLevelStatus.groups = false;
        }
        finalStatus.push(raConfigLevelStatus);

    }
    let returnValues = finalStatus.map(item => {
        const {_id, description, stratum, blockSize, groups} = item;
        if(_id && description && stratum && blockSize && groups){
            return true;
        }else  {
            return false
        }
    })//this will return a list of boolean

    if(returnValues.includes(false)){
        return false;
    }else{
        return true;
    }
}

function validateRaAconfigGroupsSchema(groups) {//verified this function is working
    let finalStatus = [];
    for (let i = 0; i < groups.length; i++) {
        const {assignment, description, sequenceLimit, ratio} = groups[i];
        let raConfigGroupLevelStatus = {};
        if(typeof assignment === "string" && assignment !== ""){
            raConfigGroupLevelStatus.assignment = true;
        }else{
            raConfigGroupLevelStatus.assignment = false;
        }
        if(typeof description === "string" && description !== ""){
            raConfigGroupLevelStatus.description = true;
        }else{
            raConfigGroupLevelStatus.description = false;
        }
        if((typeof sequenceLimit ==="string" || typeof sequenceLimit ==="number") && sequenceLimit !== ""){
            raConfigGroupLevelStatus.sequenceLimit = true;
        }else{
            raConfigGroupLevelStatus.sequenceLimit = false;
        }
        if((typeof ratio ==="string" || typeof ratio ==="number") && ratio !== ""){
            raConfigGroupLevelStatus.ratio = true;
        }else{
            raConfigGroupLevelStatus.ratio = false;
        }
        finalStatus.push(raConfigGroupLevelStatus);
    }
    let returnValues = finalStatus.map(item => {
        const {assignment, description, sequenceLimit, ratio} = item;
        if(assignment && description && sequenceLimit && ratio){
            return true;
        }else  {
            return false
        }
    })//this will return a list of boolean

    if(returnValues.includes(false)){
        return false;
    }else{
        return true;
    }
}

exports.list_to_tree = (list) => {
    var map = {},
      node,
      roots = [],
      i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }