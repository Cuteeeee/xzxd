/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ssszx
 */
public class Test {
    String title;
//    String sex;
    int price;
    String pub;
    public Test(){
    
    System.out.println("像往常一样");
    
    }

    public Test(String title,  int price ) {
        this.title = title;
//        this.sex = sex;
        this.price = price;
        this.pub = "天天精彩出版社";
        System.out.println(this.title+"价格是"+this.price+"元"+"由"+this.pub+"出版");
    }
    
    
    
}
