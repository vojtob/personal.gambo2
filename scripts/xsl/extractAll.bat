FOR %%c in (*.gpx) DO java -cp C:\prg\xalan-j_2_7_2\xalan.jar;C:\prg\xalan-j_2_7_2\serializer.jar;C:\prg\xalan-j_2_7_2\xml-apis.jar;C:\prg\xalan-j_2_7_2\xercesImpl.jar org.apache.xalan.xslt.Process -IN "%%~fc" -XSL extract.xsl -OUT "%%~dc%%~pcstart\%%~nc.txt"

copy start/*.txt starts.out