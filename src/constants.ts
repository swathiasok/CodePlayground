export const LANGUAGES: string[] = [
    "python",
    "javascript",
    "typescript",
    "cpp",
    "java",
    "csharp",
    "go",
    "php",
    "ruby",
    "rust",
];

  export const LANGUAGE_TEMPLATES: { [lang: string]: string } = {
    "python": `# Python 3.8.1
  def main():
      print("Hello, World!")
  
  if __name__ == "__main__":
      main()`,
    
    "javascript": `// JavaScript (ES2021)
  function greet() {
      console.log("Hello, World!");
  }
  greet();`,
  
    "typescript": `// TypeScript 4.9.5
  function greet(name: string): void {
      console.log(\`Hello, \${name}!\`);
  }
  greet("World");`,
  
    "cpp": `// C++17
  #include <iostream>
  int main() {
      std::cout << "Hello, World!" << std::endl;
      return 0;
  }`,
  
    "java": `// Java 17
  public class Main {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`,
  
    "csharp": `// C# 10.0
  using System;
  class Program {
      static void Main() {
          Console.WriteLine("Hello, World!");
      }
  }`,
  
    "go": `// Go 1.20
  package main
  import "fmt"
  func main() {
      fmt.Println("Hello, World!")
  }`,
  
    "php": `<?php
  // PHP 8.2
  echo "Hello, World!";
  ?>`,
  
    "ruby": `# Ruby 3.2.2
  puts "Hello, World!"`,
  
    "rust": `// Rust 1.70
  fn main() {
      println!("Hello, World!");
  }`
  };