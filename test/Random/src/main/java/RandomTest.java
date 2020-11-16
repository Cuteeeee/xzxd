/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ssszx
 */
import java.util.Random;

public class RandomTest {

    public static void main(String args[]) {
        int max = 0;
        int min = 0;
        String sum = "";
        int num = 0;
        for (int i = 0; i <= 100; i++) {
            Random rand = new Random();
            int r = rand.nextInt(99);
            if (r >= max) {
                max = r;
            } else if (r < min) {
                min = r;
            }
            String s = "" + r;
            if (r >= 50) {
                sum = sum + s + ",";
                ++num;
            }
        }
        System.out.println("最大数max=" + max + "\n" + "最小数min = " + min);
        System.out.println("大于50的个数：" + num);
    }
}
