///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
///**
// *
// * @author ssszx
// */
//import java.util.*;
//
//public class SortDemo {
//
//    //用递归实现阶乘算法
//
//
//     public static void main( String[] args){
//         
//         int[] arr = new int[]{5,6,3,6,8,10,9};
//         Arrays.sort(arr,1,7);
//        for (int x: arr) 
//        { System.out.print(x + "\t"); } 
////         System.out.println(arr);
//     } 
//     
//     }
//     
////System.out.println(c(19));
////    
////    } 
////    public static long c(int number) {
////        if (number ==1)//递归条件结束
////        {
////            return 1;//返回 1的阶乘
////        }else{
////        return number * c(number - 1);
////        //保存阶乘结果
////        }
////    
////}
////     }
////    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    
////final练习
////public final int a = 2;
////public final StringBuilder sb = new StringBuilder();
//    //排序练习
//    //直接排序  for循环嵌套
////    public static void main(String[] args) {sb.append("zhangqo");
////        int[] arr = {66, 2, 88, 86, 50, 12};
////        int[] arr2 = {2,23,45,62,58,445};
////        for (int i = 0; i < arr.length; i++) {
////            for (int j = i + 1; j < arr.length; j++) {
////                if (arr[i] < arr[j]) {
////                    int tmp = arr[i];
////                    arr[i] = arr[j];
////                    arr[j] = tmp;
////                }
//////                System.out.println("第"+j+"次:"+Arrays.toString(arr));
////            }
////
////        }
////        System.out.println(Arrays.toString(arr));
////选择排序  先遍历后换位
////        for (int i = 0; i < arr.length; i++) {
////            int max = arr[i];
////            int index = i;
////            for (int j = i; j < arr.length; j++) {
////                if (arr[j] > max) {
////                    max = arr[j];
////                    index = j;
////                }
////            }
////            max = arr[i];
////            arr[i] = arr[index];
////            arr[index] = max;
////            System.out.println(Arrays.toString(arr));
////        }
//    //插入顺序
////        for(int i = 0; i < arr.length; i++){
////            for(int j = i; j >0 ; j --){
////                if(arr[j]< arr[j-1]){
////                int tmp = arr[j];
////                arr[j] = arr[j-1];
////                arr[j-1] = tmp;
////                }else{
////                break;
////                }
//////            System.out.println("");
////            }
////        System.out.println(Arrays.toString(arr));
////        }
////        for(int i = 0; i< arr2.length;i++){
////            for(int j =i;j>0;j-- ){
////                if(arr2[j] < arr2[j-1]){
////                int tmp = arr2[j];
////                arr2[j] = arr2[j-1];
////                arr2[j-1] = tmp;
////                }
////            }
////        }
////        System.out.println(Arrays.toString(arr2));
////    }
////转换编码
////String str = "张奥奇";
////byte[] arr = str.getBytes();
////try{
////    String str2 = new String(arr);
////    System.out.println(str2);
////}
////catch(UnsupportedEncodingException e){
////    e.printStackTrace();
////}
//
//
