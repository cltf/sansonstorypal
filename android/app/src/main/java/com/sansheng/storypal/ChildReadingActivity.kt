package com.sansheng.storypal

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class ChildReadingActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_child_reading)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        findViewById<Button>(R.id.btnAge3to6).setOnClickListener {
            showToast("3-6岁绘本功能开发中...")
        }
        
        findViewById<Button>(R.id.btnAge7to9).setOnClickListener {
            showToast("7-9岁绘本功能开发中...")
        }
        
        findViewById<Button>(R.id.btnAge10to12).setOnClickListener {
            showToast("10-12岁绘本功能开发中...")
        }
    }
    
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
