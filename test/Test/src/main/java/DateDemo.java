/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ssszx
 */
import java.util.*;
import java.text.*;
//public static final DateFormat getDateInstance();
public class DateDemo {

    public static void main(String args[]) {
        //初始化date对象
        Date date = new Date();
// public static void main(String args[]) {
//        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
//
//        String input = args.length == 0 ? "1818-11-11" : args[0];
//
//        System.out.print(input + " Parses as ");
//
//        Date t;
//
//        try {
//            t = ft.parse(input);
//            System.out.println(t);
//        } catch (ParseException e) {
//            System.out.println("Unparseable using " + ft);
//        }
   SimpleDateFormat myFmt=new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
        SimpleDateFormat myFmt1=new SimpleDateFormat("yy/MM/dd HH:mm"); 
        SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//等价于now.toLocaleString()
        SimpleDateFormat myFmt3=new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒 E ");
        SimpleDateFormat myFmt4=new SimpleDateFormat(
                "一年中的第 D 天 一年中第w个星期 一月中第W个星期 在一天中k时 z时区");
        Date now=new Date();
        System.out.println(myFmt.format(now));
        System.out.println(myFmt1.format(now));
        System.out.println(myFmt2.format(now));
        System.out.println(myFmt3.format(now));
        System.out.println(myFmt4.format(now));
        System.out.println(now.toGMTString());
        System.out.println(now.toLocaleString());
        System.out.println(now.toString());
//   }
        //c的使用  
//      
//        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        
//        
//        System.out.println("当前时间为"+ft.format(date));

    }
}
//  System.out.printf("全部日期和时间信息：%tc%n", date);
//        //f的使用  
//        System.out.printf("年-月-日格式：%tF%n", date);
//        //d的使用  
//        System.out.printf("月/日/年格式：%tD%n", date);
//        //r的使用  
//        System.out.printf("HH:MM:SS PM格式（12时制）：%tr%n", date);
//        //t的使用  
//        System.out.printf("HH:MM:SS格式（24时制）：%tT%n", date);
//        //R的使用  
//        System.out.printf("HH:MM格式（24时制）：%tR", date);
