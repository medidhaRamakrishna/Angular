$('#msai_multirow_datagrid_'+F.QST.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width','100px');

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_42')).click(function(){ //Details Tab
alert('detls');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_43')).click(function(){ //Ownership details
alert('own');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_99')).click(function(){ //Identify Team
alert('identify');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_127')).click(function(){ //Define Problem
alert('define prob');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_166')).click(function(){ //containment Action
alert('containment');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_197')).click(function(){  //Root Cause Analysis
alert('root cause');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_242')).click(function(){ //Corrective Action
alert('corrective ac');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_283')).click(function(){ //verify effective ness
alert('verify');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_313')).click(function(){ //prevent reccurence
alert('prevent');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_350')).click(function(){//congratulate Team
alert('congratulate');
});

$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_144')).click(function(){ //Action Tab
alert('action');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_369')).click(function(){ //Cost of Poor Quality Tab
alert('C OPQ');
});
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_1323')).click(function(){ //Final Review Tab
alert('final review');
});

Tabs.DTLS = "MSAI_42"; //Details Tab
Tabs.OWN_DETLS = "MSAI_43"; //Owner ship Details
Tabs.IDNTFY_TEAM = "MSAI_99"; //Identify Team
Tabs.DFN_PRBLM = "MSAI_127"; //Define Problem
Tabs.CNTMT_ACT = "MSAI_166"; //containment Action
Tabs.ROOT_CAUSE = "MSAI_197"; //Root Cause Analysis
Tabs.CORRECTIVE_ACT = "MSAI_242"; //Corrective Action
Tabs.VERIFY_EFF = "MSAI_283"; //verify effective ness
Tabs.PREV_REC = "MSAI_313"; //prevent reccurence
Tabs.CONG_TEAM = "MSAI_350"; //congratulate Team
Tabs.ACTION = "MSAI_144"; //Action Tab
Tabs.COPQ = "MSAI_369"; //Cost of Poor Quality Tab
Tabs.FINAL = "MSAI_1323"; //Final Review Tab

if ( ! $('form#contact input]').hasFocus()) {
$('#MSAI_41').find('tbody').find('tr:eq(0)').find('td:eq(0)').find($('#MSAI_42')).hasFocus() {
alert('yes');
}