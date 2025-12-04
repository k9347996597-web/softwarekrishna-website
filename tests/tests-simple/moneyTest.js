/*testing
1.manualtesting 
->check directly each of the part that is used
disadavantages
->hard test every code
->hard to retest*/


//2.autmated testing=use code to test code
import{formatMoney} from '../../scripts/utils.js/money.js'
//basic testcase
//testcase-1
console.log('test suite:format currency')//group of related tests=testsuite
console.log('converts cents to dollars')//always give  test case a name
if(formatMoney(2095)==='20.95'){
  console.log("passed")
}else{
  console.log("fail")
}



//edge testcase
//testcase-2
console.log("runs with 0")
if(formatMoney(0)==='0.00'){
  console.log("passed")
}else{
  console.log("fail")
}
//testcase-3
console.log('runs with nearest round cent')
if(formatMoney(2000.5)==='20.01'){
  console.log("passed")
}else{
  console.log("fail")
}