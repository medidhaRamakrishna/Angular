
$('<tr colspan="10"><td colspan="10"><div id="div_100225">
<span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">i</a>
</span></div></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td></tr>').insertBefore("#MSAI_8");
for(var i=1;i<=6;i++)
$("#MSAI_8").append('<tr colspan="10"><td colspan="10"><div id="div_100225"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">i</a></span></div></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td></tr>');
var a='';
for(var i=1;i<=6;i++)
a=a+'<td colspan="10"><div id="div_100225"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">'+i+'</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"></td></div>';
var b='<tr colspan="10">'+a+'</tr>'
//$("#MSAI_8").append(b);
$(b).insertBefore("#MSAI_8");


$('<tr colspan="10"><td colspan="10">
<div id="div_100225">
<span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;">
<a href="javascript:test(stpObject[0.1])">Details</a></span>
<img style="vertical-align:middle" src="/images/arrow-seperator.jpg">
<span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Ownership & Due Dates</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Identify Team</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Define Problem</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Containment Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Root Cause Analysis</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Corrective Action</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Effectiveness Verification</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"><span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Prevent Recurrence</a></span><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"> <span  style="font-size: 11px;padding: 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="#">Congratulate Team</a></span></div></td></tr><tr colspan="10" style="height:15px"><td colspan="10"></td></tr>').insertBefore("#MSAI_8");

var a='';
var b='';
for(var i=1;i<=8;i++)
a=a+'<td><span  style="font-size: 11px;padding:'' 2px 2px 2px 2px;margin: 5px 2px 5px 2px;"><a href="javascript:test(stpObject[0.1])">'+'STEP'+i+'</a></span></td><td><img style="vertical-align:middle" src="/images/arrow-seperator.jpg"></td>';
b='<div id="div_100225"><tr>'+a+'</tr></div>'
//$(b).insertBefore("#MSAI_1874");
F.toolBar.updateTitle(F.toolBar.title+''+b);