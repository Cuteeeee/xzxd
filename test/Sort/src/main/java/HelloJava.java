/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ssszx
 */
//输入输出使用范例
import java.io.*;
//局部变量的使用
import java.util.Scanner;

public class HelloJava {

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入年份：");
        int year = scanner.nextInt();
        System.out.println("请输入月份：");
        int month = scanner.nextInt();
        int dayNum = theDayNum(month);
        if (isLeapYear(year)) {
            if (month == 2) {
                dayNum++;

            }
            System.out.print(year + "是闰年");
        } else {

            System.out.print(year + "不是闰年");

        }
        System.out.println(year + "年" + month + "月份共有" + dayNum + "天");

    }

    //判断闰年
    public static boolean isLeapYear(int year) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return true;
        } else {
            return false;
        }
    }
//判断天数

    public static int theDayNum(int month) {
        switch (month) {
            case 1:
                return 31;
            case 2:
                return 28;
            case 3:
                return 31;
            case 4:
                return 30;
            case 5:
                return 31;
            case 6:
                return 30;
            case 7:
                return 31;
            case 8:
                return 31;
            case 9:
                return 30;
            case 10:
                return 31;
            case 11:
                return 30;
            case 12:
                return 31;
            default:
                System.out.println("对不起，您输入的月份有误！");
                return 0;
        }
    }
}
