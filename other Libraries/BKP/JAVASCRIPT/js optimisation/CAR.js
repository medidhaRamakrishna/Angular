$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_42')).click(function () { //Details Tab
	alert('detls');

});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_43')).click(function () { //Ownership details
	alert('own');

});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_99')).click(function () { //Identify Team
	alert('identify');
	$('#msai_multirow_datagrid_' + F.PTM.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_127')).click(function () { //Define Problem
	alert('define prob');
	$('#msai_multirow_datagrid_' + F.QST.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_166')).click(function () { //containment Action
	alert('containment');
	$('#msai_multirow_datagrid_' + F.CNT.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_197')).click(function () { //Root Cause Analysis
	alert('root cause');
	$('#msai_multirow_datagrid_' + F.RCA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_242')).click(function () { //Corrective Action
	alert('corrective ac');
	$('#msai_multirow_datagrid_' + F.CRA.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_283')).click(function () { //verify effective ness
	alert('verify');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_313')).click(function () { //prevent reccurence
	alert('prevent');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_350')).click(function () { //congratulate Team
	alert('congratulate');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_144')).click(function () { //Action Tab
	alert('action');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_369')).click(function () { //Cost of Poor Quality Tab
	alert('C OPQ');
	$('#msai_multirow_datagrid_' + F.CPQ.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '100px');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_1323')).click(function () { //Final Review Tab
	alert('final review');
});

//*************ON CHANGE EVENTS*****************************/
//This Function is for Hiding the Tabs Based on Step and Stage
F.HID_TABS_INFO.onChange(function () {
	hideTabs();
});
//*******Onchange Related to Initiator
//based on CAR requested for Process/product selection following validations to be done
F.REQUESTED_FOR.onChange(function () {
	requestedForValidation();
});
//based on Origin selection following validations to be done
F.ORIGIN.onChange(function () {

	originBasedValidaion();
});

//When SOURCE_SYSTEM_ID is change then the following fields should be cleared
F.SOURCE_SYSTEM_ID.onChange(function () {
	F.ORIGIN.write("");
	F.REQUESTED_FOR.write("");
	F.THRDPRTY_ORG_NME.writeValue('', '');
	F.THRDPRTY_ORG_NME.hide();
	F.THRDPRTY_ORG_NME.makeNotRequired();
	F.THIRDPARTY_LOC.hide();
	F.THIRDPARTY_LOC.writeValue('', '');
	F.THIRDPARTY_LOC.makeNotRequired();
	F.PRODUCT_ID.hide();
	F.PRODUCT_ID.writeValue('', '');
	F.PRODUCT_ID.makeNotRequired();
	F.SRC_PROCESS_NAME.hide();
	F.SRC_PROCESS_NAME.writeValue('', '');
	F.SRC_PROCESS_NAME.makeNotRequired();
	F.CUSTOMER_NAME.writeValue('', '');
	F.CUSTOMER_NAME.hide();
	F.CUSTOMER_NAME.makeNotRequired();
	F.CUSTOMER_LOCATION.writeValue('', '');
	F.CUSTOMER_LOCATION.hide();
	F.CUSTOMER_LOCATION.makeNotRequired();
	sourceidValidation();
	F.INTERNAL_DEPARTMENT_NAME.hide();
	F.INTERNAL_DEPARTMENT_LOCATION.hide();
	F.INTERNAL_DEPARTMENT_CONTACT.hide();
	F.INTERNAL_DEPARTMENT_NAME.makeNotRequired();
	F.INTERNAL_DEPARTMENT_LOCATION.makeNotRequired();
	F.INTERNAL_DEPARTMENT_CONTACT.makeNotRequired();
});

//Preliminary evaluation is forformed or not  1-yes 2-no
F.PRIMARY_EVAL_PERFORMED.onChange(function () {
	if (F.HID_STEP.read() == 0 || F.HID_STEP.read() == '')
		if (F.PRIMARY_EVAL_PERFORMED.read() == 1) {
			F.PRIMARY_EVAL_PERFMD_DESC.makeRequired();
		} else {
			F.PRIMARY_EVAL_PERFMD_DESC.makeNotRequired();
		}
	primaryEvaluationValidation();
});
//*******Onchange Related to Manager
//****If CAR Manager want to change the Organisation   Manager stage ******/
F.RESP_DEPT.onChange(function () {
	duedatehide();
	if (F.DD_CURRENT_STAGE.read() == 'MGR') {

		var r2 = F.RESP_DEPT.read();
		var d2 = F.RESP_DEPT.readDisplayedValue();
		if (r1 != r2)
			if (F.APPROVE_CAR_INITIATION.read() == 1) {
				var resp = confirm(jsAlertMessages["DEPT_CHANGE"]);
				if (resp) {
					clearOwnership();
					F.APPROVE_CAR_INITIATION.write('');
					F.STP.hide();
					F.STP.deleteAllRows();
					F.STP.makeEmpty();
					F.CAR_OWNER.hide();
					F.FINAL_APPROVER.hide();
					F.FINAL_APPROVER_ORG.hide();
				} else {
					F.RESP_DEPT.writeValue(r1, d1);
				}
			}
	}
});

//****If CAR Manager want to change the Priority   Manager stage  compare previous and present priority******/
F.DUE_DATE.onChange(function () {
	if (F.DUE_DATE.read() != '' && (F.DD_CURRENT_STAGE.read() == '' || F.DD_CURRENT_STAGE.read() == 'INT'))
		F.DUE_DATE.show();
});
F.PRIORITY.onChange(function () {
	duedatehide();
	if (F.DD_CURRENT_STAGE.read() == 'MGR') {
		var p2 = F.PRIORITY.read();
		if (F.APPROVE_CAR_INITIATION.read() == 1) {
			for (var i = 1; i <= F.STP.getRowCount(); i++)
				F.STEP_DUE_DATE.writeValue('', '', i);
		}

	}

});
//L1_approver is selected then L2_approver is enabled in StP region
F.STEP_L1_APPROVER.onChange(function (row) {
	if (F.STEP_L1_APPROVER.read(row) != '') {
		F.STEP_L2_APPROVER.enable(row);
	} else {
		F.STEP_L2_APPROVER.disable(row);
	}
});
//new step owner change
F.NEW_STEP_OWNER.onChange(function () {
	mgr_flag = true;

});
//Incase of Priority is changed then step due date only need to updated
F.HID_OWN_TAB.onChange(function () {
	if (F.DD_CURRENT_STAGE.read() == 'MGR' && F.APPROVE_CAR_INITIATION.read() == 1)
		getOwnerShipDetails();

});
//onChange of CAROwner Field for 
F.CAR_OWNER.onChange(function () { 
	F.STEP_DESC.disableAll();
	var carOwnerStoredName = F.CAR_OWNER.read();
	var carOwnerFullName = F.CAR_OWNER.readValue();
	F.HID_MGR_OWN_SAME.write('');

	if (F.HID_STEP.read() == 0) {

		if (F.MANAGER.read() == F.CAR_OWNER.read())
			F.HID_MGR_OWN_SAME.write('Y');
		else
			F.HID_MGR_OWN_SAME.write('');
	}

	if (F.CAR_OWNER.read() != '') {
		var j = F.STP.getRowCount();
		for (i = 1; i <= j; i++) {
			if (i == j) {

				F.DUE_DATE.writeValue(F.STEP_DUE_DATE.read(i), F.STEP_DUE_DATE.read(i));
			}
			if (i == 6) {

				F.STEP_OWNER.writeValue(F.MANAGER.read(), F.MANAGER.readValue(), parseInt(i));
			} else {

				if (F.STEP_OWNER.read(i) == '')
					F.STEP_OWNER.writeValue(carOwnerStoredName, carOwnerFullName, i);
				else if (old_own == F.STEP_OWNER.read(i)) {
					F.STEP_OWNER.writeValue(carOwnerStoredName, carOwnerFullName, i);
				}
			}
		}
	}
	old_own = F.CAR_OWNER.read();
});
//onchange of manager the final approver should be defaulted
F.MANAGER.onChange(function () {
	F.FINAL_APPROVER.writeValue(F.MANAGER.read(), F.MANAGER.readDisplayedValue());
	F.FINAL_APPROVER_ORG.writeValue(F.RESP_DEPT.read(), F.RESP_DEPT.readDisplayedValue());
	if (F.STP.getRowCount() > 6 && F.STEP_OWNER.read(6) == '')
		F.STEP_OWNER.writeValue(F.MANAGER.read(), F.MANAGER.readDisplayedValue(), 6);
});
/* The below function is used to make sure that the same role-user in identify team doesn't repeat */
F.PTM_NAME.onChange(function (row) {
	if (F.PTM_NAME.read(row) != '') {
		for (i = 1; i <= F.PTM.getRowCount(); i++) {
			if (row != i) {
				if (F.PTM_NAME.read(row) == F.PTM_NAME.read(i)) {
					if (F.PTM_ROLE.read(row) == F.PTM_ROLE.read(i)) {
						alert(jsAlertMessages["SM_ROLE_USER"]);
						F.PTM_NAME.writeValue('', '', row);
					}
				}
			}
		}
	}

});


//This block of code is for step 6 based on NEED_EFFECT_VERIFICATION drop down
F.NEED_EFFECT_VERIFICATION.onChange(function () {
	if (F.NEED_EFFECT_VERIFICATION.read() == 1) {
		F.EFFECT_CHECK_AUTHORITY.makeRequired();
		F.EFFECT_CHECK_DUE_DATE.makeRequired();
		F.USER_ACTION.addToDropDown(9, 'Verify Effectiveness');

	} else {
		F.EFFECT_CHECK_AUTHORITY.makeNotRequired();
		F.EFFECT_CHECK_DUE_DATE.makeNotRequired();
		F.USER_ACTION.removeFromDropDown(9);
	}

});

//These 3 on chage functions to calculate the RPN 
F.SEVERITY_OF_IMPACT.onChange(function () {
	rpnCalculation();
});

F.LH_OF_OCCURRENCE.onChange(function () {
	rpnCalculation();
});
F.LH_OF_DETECTION.onChange(function () {
rpnCalculation();
});
//Based on Selection From Drop Down Do you approve the initiation of CAR
F.APPROVE_CAR_INITIATION.onChange(function () {
	if (F.APPROVE_CAR_INITIATION.read() == 1) //1-yes
	{
		if (F.MANAGER.read() == '')
			F.MANAGER.writeValue(mgrStored1, mgrDisp1);
		F.USER_ACTION.addToDropDown(14, "Accept");
		F.USER_ACTION.removeFromDropDown(2);
		F.USER_ACTION.removeFromDropDown(17);
		F.USER_ACTION.removeFromDropDown(13);
		if (F.HID_OWN_TAB.read() == '') {
			alert(jsAlertMessages["STEPS_INFO"]);
		}
		getOwnerShipDetails();
		OwnershipDetailsValidation();
		//STPmakeRequire();
	} else if (F.APPROVE_CAR_INITIATION.read() == 2) //no
	{
		if (F.STEP_OWNER.read(1) != '' || F.STP.getRowCount() > 1) {
			var resp = confirm(jsAlertMessages["APPROVE_CAR"]);
			if (resp) {
				clearOwnership();
			} else {
				F.APPROVE_CAR_INITIATION.writeValue(1);
			}
		}

		F.USER_ACTION.removeFromDropDown(14);
		F.USER_ACTION.addToDropDown(2, "Cancel");
		F.USER_ACTION.addToDropDown(17, "Seek Additional Info");
		F.USER_ACTION.addToDropDown(13, "Transfer Ownership");
		OwnershipDetailsValidation();
		STPmakeNotRequire();
	} else {
		clearOwnership();
		F.STP.hide();
		F.CAR_OWNER.hide();
		F.FINAL_APPROVER_ORG.hide();
		F.FINAL_APPROVER_ORG.makeNotRequired();
		F.FINAL_APPROVER.hide();
		F.FINAL_APPROVER.makeNotRequired();
		F.USER_ACTION.removeFromDropDown(2);
		F.USER_ACTION.removeFromDropDown(17);
		F.USER_ACTION.removeFromDropDown(13);
		F.USER_ACTION.removeFromDropDown(14);
		STPmakeNotRequire();

	}
	//getOwnerShipDetails();
});
F.CAR_CREATED_BY.onChange(function () {
	F.CAR_CREATED_BY.disable();
});

/* Action date validations*/

F.ACTION_ITEM_START_DATE.onChange(function (row) {
	if (F.ACTION_STEP_HIDDEN.read(row) == '')
		actionItemStDtValidate(row);
});

F.ACTION_ITEM_DUE_DATE.onChange(function (row) {
	if (F.ACTION_STEP_HIDDEN.read(row) == '')
		actionItemEndDtValidate(row);
});
//**functions Section
function rpnCalculation()
{
var sev_of_impac = F.SEVERITY_OF_IMPACT.read();
	var like_of_occu = F.LH_OF_OCCURRENCE.read();
	var like_of_detect = F.LH_OF_DETECTION.read();
	var rpn = sev_of_impac * like_of_occu * like_of_detect;
	F.RPN.writeValue(rpn, rpn);}
	
	
	
	
	
	
	//This is to handle RTF fields
F.PROBLEM_DESC.checkClob(function (row) {
	return false;
});

F.PRIMARY_EVAL_PERFMD_DESC.checkClob(function (row) {
	return false;
});

F.SUMMARY_OF_CNTNMNT_ACTION.checkClob(function (row) {
	return false;
});

F.CNT_ACTION_DESCRIPTION.checkClob(function (row) {
	return false;
});

F.PROCESS_CONTAINED.checkClob(function (row) {
	return false;
});

F.RCA_SUMMARY.checkClob(function (row) {
	return false;
});

F.CRA_PLAN_IMPL_SUMMARY.checkClob(function (row) {
	return false;
});

F.SUMMARY_OF_REC_PREV_PLAN.checkClob(function (row) {
	return false;
});

F.TASK_DESCRIPTION.checkClob(function (row) {
	return false;
});

F.CONGRATULATORY_NOTE.checkClob(function (row) {
	return false;
});

F.ACTION_DESC.checkClob(function (row) {
	return false;
});

F.ACTION_RESPONSE.checkClob(function (row) {
	return false;
});

F.COPQ_DESCRIPTION.checkClob(function (row) {
	return false;
});

F.HID_ACTION_RESPONSE.checkClob(function (row) {
	return false;
});

F.HID_ACT_OWNER_CHANGE.checkClob(function (row) {
	return false;
});
