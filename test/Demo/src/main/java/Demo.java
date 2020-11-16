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

public class Demo {

    public static void main(String[] args) {

//        Scanner scanner = new Scanner(System.in);
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入单价（￥）:");

        double price = scanner.nextDouble();

        System.out.println("请输入数量：");

        double amount = scanner.nextDouble();

        System.out.println("请输入收款金额：");

        double count = scanner.nextDouble();

        double totalMoney = price * amount;

        if (totalMoney > 500) {

            totalMoney = totalMoney * 0.8;

        }

        double change = count - totalMoney;

        System.out.println("应收金额为：" + totalMoney + "找零为：" + change);

//        System.out.println("请输入分数：");
//
//        double score = scanner.nextDouble();
//
//        scanner.close();
//
//        if (score < 0 || score > 100) {
//
//            System.out.println("输入的分数不在0-100之间，不符合要求");
//
//        } else if (score >= 90) {
//
//            System.out.println("A");
//
//        } else if (score >= 80) {
//
//            System.out.println("B");
//
//        } else if (score >= 60) {
//
//            System.out.println("C");
//
//        } else {
//
//            System.out.println("D");
//
//        }
//
//    }
/*

 * 有一个命令解析程序，该程序提供三个功能选型供用户选择，

 * 用户选择某功能后，程序在界面上输出用户所选择的的功能名称。

 * 

 * */
        System.out.println("请选择功能：1.显示全部记录  2.查询登录记录 0.退出");

        int command = scanner.nextInt();

        scanner.close();

        switch (command) {

            case 0:

                System.out.println("欢迎使用");

                break;

            case 1:

                System.out.println("显示全部记录……");

                break;

            case 2:

                System.out.println("查询登录记录……");

                break;

            default:

                System.out.println("输入错误！");

        }

    }
}
