$('#msai_data_grid_container_' + F.STP.getID()).find('div:eq(1)').find('div:eq(0)').css('width', '');
$('#msai_multirow_datagrid_' + F.QST.getID()).find('thead').find('tr:eq(0)').find('th:eq(1)').attr('width', '15%');
$('#msai_data_grid_container_'+F.QST.getID()).find('thead tr:eq(0) th:eq(1)').attr('width','15%');


JSON inb the form layout:
click on grid ->advanced_>json

{"NCM_PROCESS_STEP":{"columnWidth":"45%"
},
"NCM_PROCESS_OWNER":{"columnWidth":"40%"
},
"NCM_INCL_STEP":{"columnWidth":"15%"
}}