/**
 * Created by nqmy on 2015/8/21.
 * unique 数组去重
 *sortBy 字符串数组根据条件去排序 index:字符串的字母index，sort：“desc” ||“asc“
 */
Array.prototype.unique = function(){
    var i,j,len = this.length,tempArr = [],tempLen,state;
    for(i = 0 ; i < len ; i++){
        tempLen = tempArr.length;
        state = true;
        for(j = 0 ; j<tempLen;j++){
            if(this[i] == tempArr[j]){
                state = false;
            }
        }
        if(state){
            tempArr.push(this[i]);
        }
    }
    return tempArr;
};

Array.prototype.sortBy = function(index,sort){
    index = index || 0;
    sort = sort || "asc";
    var i, j, t, len = this.length;
    for(i = 0 ; i < len ; i ++){
        for(j = 1 ; j < len ; j++){
            if(this[j].charCodeAt(index >= 0 ? index : this[j].length+index) > this[j-1].charCodeAt(index >= 0 ? index : this[j-1].length+index)){
                if(sort === "asc"){
                    //不作操作
                }else{
                    t = this[j];
                    this[j] = this[j-1];
                    this[j-1] = t;
                }
            }else{
                if(sort === "asc"){
                    t = this[j];
                    this[j] = this[j-1];
                    this[j-1] = t;
                }else{
                    //不作操作
                }
            }
        }
    }
    return this;
};
console.log(["kitty","puppy","swan","penguin","giraffe","penguin","swan","dolphin"].unique());
console.log([ 'kitty', 'puppy', 'swan', 'penguin', 'dolphin', 'giraffe' ].sortBy(-2));
console.log(["kitty","puppy","swan","penguin","giraffe","penguin","swan","dolphin"].unique().sortBy(-2));

