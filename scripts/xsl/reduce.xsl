<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:gps="http://www.topografix.com/GPX/1/1" xmlns="http://www.topografix.com/GPX/1/1" version="1.0">
  <xsl:output method="xml" indent="yes" />
    
	<xsl:param name = "legNumber" />
	
	<xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>
	
  <xsl:template match="gps:trkpt">
	<xsl:element name="trkpt">
		<xsl:attribute name="lat"><xsl:value-of select="round(@lat * 10000000) div 10000000"/></xsl:attribute>
		<xsl:attribute name="lon"><xsl:value-of select="round(@lon * 10000000) div 10000000"/></xsl:attribute>
		<xsl:element name="ele"><xsl:value-of select="gps:ele"/></xsl:element>
	</xsl:element>
  </xsl:template>

  <xsl:template match="gps:name">
	<xsl:element name="name">TheRun Slovakia 2016 - etapa <xsl:value-of select="$legNumber"/></xsl:element>
  </xsl:template>

  <xsl:template match="gps:metadata">
  </xsl:template>

</xsl:stylesheet>