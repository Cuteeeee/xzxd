/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ssszx
 */
import java.util.Scanner;

public class UsingAttribute {

    public static void main(String args[]) {
//  Person p1 = new Person();
////  p1.name = "张三";
////  p1.age = 24;
//  p1.talk();
//       while (true) {
//		Scanner s=new Scanner(System.in);//声明对象Scanner,System.in代表标准输入，就是键盘输入
//		System.out.println("Please input ：");//输入提示
//		String line=s.nextLine();//读取输入的字符放入line中
//		if (line.equals("exit")) break; //如果输入的内容是exit就会停止运行了
//		System.out.println("Number of text input："+line.length());//使用length计算输入的文本的个数
//	}

//数组的练习
//翻转数组
        int[] arr = {1, 2, 3, 4, 5, 6};

        //在原有位置上做翻转，不创建新的数组
//        for (int i = 0; i < arrays.length / 2; i++) {
//            int tmp = arrays[i];
//            //交换元素
//            arrays[i] = arrays[arrays.length - 1 - i];
//            arrays[arrays.length - 1 - i] = tmp;
//
//        }
//        for (int i = 0; i < arrays.length; i++) {
//
//            System.out.println(arrays[i]);
//        }
        int[] arr1 = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            arr1[i] = arr[arr.length - i - 1];
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr1[i]);
        }

//逻辑判断练习
//        boolean flag = true;
//        if (flag) {
//            System.out.println("我觉得这里可以了");
//        } else {
//            System.out.println("可能做的还是不够好");
//        }
//        if (3 + 4 > 5 && 1 + 2 > 2) {
//
//            System.out.println("我学会了");
//        } else {
//            System.out.println("还需要多加练习");
//        }
        //程序现在所用的==比较的是两个对象的内存地址并没有比较内存
        //所以结果是str2==str3
//        if (str1 == str2) {
//            System.out.println("str1==str2");
//        } else {
//            System.out.println("str1!=str2");
//        }
//        if(str2 == str3){
//        
//        System.out.println("str2==str3");
//        
//        }else{
//        System.out.println("str2!=str3");
//        }
//比较内容用的是equals
//   if (str1.equals(str2) ) {
//            System.out.println("str1==str2");
//        } else {
//            System.out.println("str1!=str2");
//        }
//        if(str2.equals(str3)){
//        
//        System.out.println("str2==str3");
//        
//        }else{
//        System.out.println("str2!=str3");
//        }
    }
}
//class Person{
//// String name;
//// int age;
// public void talk(){
// System.out.println("面朝大海春暖花开");
// 
// }
//
//}
//  static String a = "string-a";
//    static String b;
//    String c = "string-c";
//    String d;
//
//    static {
//
//        printStatic("before static");
//
//        b = "string-b";
//        printStatic("after static");
//
//    }
//
//    public static void printStatic(String title) {
//        System.out.println("-------" + title + "-------");
//        System.out.println("a=\"" + a + "\"");
//        System.out.println("b=\"" + b + "\"");
//
//    }
//    
//    public static void main(String args[]){
//    System.out.println();
//    
//    }
